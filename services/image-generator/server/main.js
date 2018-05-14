import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import puppeteer from 'puppeteer';
import PQueue from 'p-queue';

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
  Geometries.find(
    { 'images.512': { $exists: false } },
    { limit: 100, sort: { createdAt: -1 } }
  ).observe({
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
          Geometries.update(geometry._id, {
            $set: {
              images: {
                512: dataURL,
              },
            },
          });
          // console.log(dataURL);
          console.log('image saved!');
        }
      });
    },
  });
}, 5000);
