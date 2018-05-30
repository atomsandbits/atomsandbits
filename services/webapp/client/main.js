import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { onPageLoad } from 'meteor/server-render';
import { MuiThemeProvider } from '@material-ui/core/styles';

import client from '/client/imports/apollo-client';
import { MuiTheme } from '/both/imports/theme';

import '/client/imports/account-cookie';

onPageLoad(async (sink) => {
  const App = (await import('/both/imports/App')).App;
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MuiThemeProvider theme={MuiTheme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('react-root')
  );
});
