import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { exec } from 'child_process';
import fs from 'fs';
import webdriver from 'selenium-webdriver';
import chromedriver from 'chromedriver';

console.log(process.env.ROOT_URL);

// kill old chrome processes
// TODO: handle the fact this kills real chrome processes
exec("kill -9 `pgrep -f '\\-\\-headless'`");
exec('killall chromedriver');

/* Collections */
const Geometries = new Mongo.Collection('geometries');

/* Setup Chromedriver */
const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {
  binary: '/usr/bin/google-chrome',
  args: [
    '--headless',
    '--use-gl=osmesa',
    '--no-sandbox',
    '--ignore-gpu-blacklist',
    '--enable-webgl-draft-extensions',
  ],
});

/* Get DataURL with Selenium */
const getDataURL = ({ xyz }) => {
  const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

  // Navigate to google.com, enter a search.
  driver.get(`${process.env.ROOT_URL}#${encodeURIComponent(xyz)}`);

  const dataURLElement = driver.findElement(webdriver.By.id('data-url'));
  driver
    .wait(webdriver.until.elementIsVisible(dataURLElement), 5000)
    .catch(error => {
      driver.quit();
      throw error;
    });

  return dataURLElement.getAttribute('innerHTML').then(dataURL => {
    driver.quit();
    return dataURL;
  });
};

Geometries.find().observe({
  added: async geometry => {
    if (!geometry.images || !geometry.images['512']) {
      const xyz = `${geometry.totalAtoms}\n\n${geometry.atomicCoords}`;
      const dataURL = await getDataURL({ xyz });
      Geometries.update(geometry._id, {
        $set: {
          images: {
            512: dataURL,
          },
        },
      });
    }
  },
});
