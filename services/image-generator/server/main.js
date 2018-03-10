import { Meteor } from 'meteor/meteor';
// import Speck from 'speck-renderer';

Meteor.startup(() => {
  // code to run on server at startup
});

const webdriverio = require('webdriverio');
const chromedriver = require('chromedriver');

const PORT = 9515;

chromedriver.start(['--url-base=wd/hub', `--port=${PORT}`, '--verbose']);

(async () => {
  const opts = {
    port: PORT,
    desiredCapabilities: {
      browserName: 'chrome',
      loggingPrefs: { browser: 'ALL', driver: 'ALL' },
      chromeOptions: { args: ['--headless', '--use-gl', '--ignore-gpu-blacklist', '--enable-webgl-draft-extensions'] },
    },
  };

  const browser = webdriverio.remote(opts).init();

  await browser.url('http://webglreport.com/?v=2');

  const title = await browser.getTitle();
  console.log(`Title: ${title}`);

  // const wait = await browser.pause(5000);

  const buffer = await browser.saveScreenshot('screenshot.png');
  console.log('Saved screenshot...');

  const browserLogs = await browser.log('browser');
  const clientLogs = await browser.log('driver');

  chromedriver.stop();
  browser.end();
})();

// const fs = require('fs');
// const webdriver = require('selenium-webdriver');
// const chromedriver = require('chromedriver');
//
// const chromeCapabilities = webdriver.Capabilities.chrome();
// chromeCapabilities.set('chromeOptions', {args: ['--headless']});
//
// const driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .withCapabilities(chromeCapabilities)
//   .build();
//
// // Navigate to google.com, enter a search.
// driver.get('https://www.google.com/');
// // driver.findElement({name: 'q'}).sendKeys('webdriver');
// // driver.findElement({name: 'btnG'}).click();
// // driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
//
// // Take screenshot of results page. Save to disk.
// driver.takeScreenshot().then(base64png => {
//   console.log('Saving image...');
//   fs.writeFileSync('screenshot.png', new Buffer(base64png, 'base64'));
// });
//
// // driver.quit();
