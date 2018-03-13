import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import Routes from '/both/imports/routes';

let Router;
if (Meteor.isClient) {
  Router = BrowserRouter;
} else {
  Router = StaticRouter;
}

class App extends Component {
  render() {
    return (
      <Router location={this.props.location} context={{}}>
        <Routes />
      </Router>
    )
  }
}

export { App };