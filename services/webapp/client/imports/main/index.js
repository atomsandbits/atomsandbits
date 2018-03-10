import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from 'material-ui/styles';

import client from '/client/imports/apollo-client';
import Routes from '/client/imports/routes';
import ResponsiveDrawer from '/client/imports/components/ResponsiveDrawer';
import { MuiTheme } from '/client/imports/theme';

import './styles';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <MuiThemeProvider theme={MuiTheme}>
        <ResponsiveDrawer content={<Routes />} />
      </MuiThemeProvider>
    </Router>
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
