import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { ServerStyleSheet } from 'styled-components';

import { App } from '/both/imports/App';

let sheet = null;
let html = '';

onPageLoad((sink) => {
  if (!html || !sheet) {
    // only render once and cache afterwards
    sheet = new ServerStyleSheet();
    html = renderToString(
      sheet.collectStyles(<App location={sink.request.url} />)
    );
  }
  sink.renderIntoElementById('root', html);
  sink.appendToHead(sheet.getStyleTags());
});
