import React from "react";
import ReactDOM from "react-dom";
import { onPageLoad } from "meteor/server-render";

onPageLoad(async sink => {
  const App = (await
      import ("/both/imports/App"))
    .App;
  ReactDOM.hydrate(
    <App location={window.location} />,
    document.getElementById("root")
  );
});
