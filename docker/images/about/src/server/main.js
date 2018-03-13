import React from "react";
import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";
import { ServerStyleSheet } from "styled-components";

import { App } from "/both/imports/App";

onPageLoad(sink => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(
    <App location={sink.request.url} />
  ));
  sink.renderIntoElementById("root", html);
  sink.appendToHead(sheet.getStyleTags());
});
