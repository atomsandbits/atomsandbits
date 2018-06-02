import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import puppeteer from 'puppeteer';
import PQueue from 'p-queue';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import util from 'util';
import fs from 'fs';
import { generateSVG } from 'node-primitive';
import { Triangle } from 'node-primitive/src/shape';

process.setMaxListeners(100);
console.log(process.env.ROOT_URL);

// kill old chrome processes
// TODO: handle the fact this kills real chrome processes
// exec("kill -9 `pgrep -f '\\-\\-headless'`");
// exec('killall chromium');

const concurrency = 1;
const queue = new PQueue({ concurrency: concurrency });

/* Collections */
const Geometries = new Mongo.Collection('geometries');

let browser;
(async () => {
  browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: false,
    args: ['--window-size=300,200'],
  });
})();

let counter = 0;
/* Get DataURL with Headless Browser */
const getDataURL = async ({ xyz }) => {
  if (counter > 10000) {
    await browser.close();
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      headless: false,
      // args: ['--headless'],
    });
    counter = 0;
  }
  const page = await browser.newPage();

  // ~~~ Tests ~~~
  // await page.goto('http://webglreport.com/');
  // await page.screenshot({ path: 'screenshot1.png' });
  // await page.goto('chrome://gpu');
  // await page.screenshot({ path: 'screenshot2.png' });
  // await page.goto('http://wwwtyro.github.io/speck/');
  // await page.screenshot({ path: 'screenshot3.png' });
  // dataURL = '';

  const url = `${process.env.ROOT_URL}#${encodeURIComponent(xyz)}`;
  await page.goto(url);
  await page.waitForSelector('#data-url', { timeout: 10000 });
  const dataURL = await page.evaluate(
    () => document.getElementById('data-url').innerHTML
  );

  await page.close();
  counter += 1;

  return dataURL;
};

// const geometry = Geometries.findOne();
// getDataURL({ xyz: `${geometry.totalAtoms}\n\n${geometry.atomicCoords}` }).then(
//   dataURL => console.log(dataURL)
// );

Meteor.setTimeout(() => {
  Geometries.find({}, { limit: 100, sort: { createdAt: -1 } }).observe({
    added: (geometry) => {
      queue.add(async () => {
        if (!geometry.images || !geometry.images['512']) {
          console.log('Generating image for: ', geometry._id);
          const xyz = `${geometry.totalAtoms}\n\n${geometry.atomicCoords}`;
          let dataURL;
          try {
            dataURL = await getDataURL({ xyz });
          } catch (error) {
            console.log(error);
            return;
          }
          const bufferedImage = Buffer.from(
            dataURL.split('data:image/png;base64,')[1],
            'base64'
          );
          const minifiedImage = await imagemin.buffer(bufferedImage, {
            plugins: [imageminPngquant({ quality: '65-100' })],
          });
          Geometries.update(geometry._id, {
            $set: {
              'images.512': minifiedImage,
              'images.minified': true,
            },
          });
          /* create low poly img */
          const geometryFile = `${geometry._id}.png`;
          await util.promisify(fs.writeFile)(
            geometryFile,
            bufferedImage,
            'binary'
          );
          const SVGString = await generateSVG(geometryFile, {
            alpha: 0.5,
            computeSize: 256,
            fill: 'rgb(255, 255, 255)',
            height: 256,
            mutateAlpha: true,
            mutations: 30,
            scale: 2,
            shapeTypes: [Triangle],
            shapes: 20,
            steps: 20,
            viewSize: 512,
            width: 256,
            blur: 35,
          });
          await util.promisify(fs.unlink)(geometryFile);
          Geometries.update(geometry._id, {
            $set: {
              'images.placeholder': SVGString,
            },
          });
          // console.log(dataURL);
          console.log(`Geometry #${geometry._id}: images saved...`);
        }
      });
    },
  });
}, 5000);

/* Convert Base64 to buffer */
// Meteor.startup(() => {
//   Geometries.find(
//     { 'images.512': { $type: 'string' } },
//     { _id: 1, 'images.512': 1 }
//   ).forEach(function(geometry) {
//     const bufferedImage = Buffer.from(
//       geometry.images['512'].split('data:image/png;base64,')[1],
//       'base64'
//     );
//     Geometries.update(geometry._id, {
//       $set: {
//         images: {
//           512: bufferedImage,
//         },
//       },
//     });
//   });
// });

/* minify */
const minifyQueue = new PQueue({ concurrency: 20 });
Meteor.startup(() => {
  Geometries.find(
    { 'images.512': { $exists: true }, 'images.minified': { $ne: true } },
    { _id: 1, 'images.512': 1, sort: { createdAt: -1 } }
  ).forEach((geometry) => {
    minifyQueue.add(async () => {
      const imageBinary = geometry.images['512'];
      const bufferedImage = Buffer.from(imageBinary, 'binary');
      const minifiedImage = await imagemin.buffer(bufferedImage, {
        plugins: [imageminPngquant({ quality: '65-100' })],
      });
      Geometries.update(geometry._id, {
        $set: {
          'images.512': minifiedImage,
          'images.minified': true,
        },
      });
      console.log(`Geometry #${geometry._id}: minified...`);
    });
  });
});

/* create placeholders */
const placeholderQueue = new PQueue({ concurrency: 10 });
Meteor.startup(() => {
  Geometries.find(
    {
      'images.placeholder': { $exists: false },
      'images.512': { $exists: true },
    },
    { _id: 1, 'images.512': 1, sort: { createdAt: -1 } }
  ).forEach((geometry) => {
    placeholderQueue.add(async () => {
      const imageBinary = geometry.images['512'];
      const bufferedImage = Buffer.from(imageBinary, 'binary');
      const geometryFile = `${geometry._id}.png`;
      await util.promisify(fs.writeFile)(geometryFile, bufferedImage, 'binary');
      const SVGString = await generateSVG(geometryFile, {
        alpha: 0.5,
        computeSize: 256,
        fill: 'rgb(255, 255, 255)',
        height: 256,
        mutateAlpha: true,
        mutations: 30,
        scale: 2,
        shapeTypes: [Triangle],
        shapes: 20,
        steps: 20,
        viewSize: 512,
        width: 256,
        blur: 35,
      });
      await util.promisify(fs.unlink)(geometryFile);
      Geometries.update(geometry._id, {
        $set: {
          'images.placeholder': SVGString, // squipped.svg_base64encoded,
        },
      });
      console.log(`Geometry #${geometry._id}: placeholder created...`);
    });
  });
});
