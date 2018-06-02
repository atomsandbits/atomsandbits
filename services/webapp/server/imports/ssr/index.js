import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { ServerStyleSheet } from 'styled-components';

import { App } from '/both/imports/App';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import { ApolloProvider, getDataFromTree } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { getUserForContext } from 'meteor/apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { schema } from '/server/imports/api';

import {
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiTheme } from '/both/imports/theme';

onPageLoad(async (sink) => {
  // console.time('Fetch Page');
  const { loginToken } = sink.getCookies();
  const { user } = await getUserForContext(loginToken);

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({
      schema,
      context: { user, userId: user ? user._id : undefined },
    }),
    cache: new InMemoryCache(),
  });
  // const client = new ApolloClient({
  //   ssrMode: true,
  //   // Remember that this is the interface the SSR server will use to connect to the
  //   // API server, so we need to ensure it isn't firewalled, etc
  //   link: createHttpLink({
  //     uri: 'http://localhost:3000/graphql',
  //     credentials: 'same-origin',
  //     headers: {
  //       'meteor-login-token': loginToken,
  //       cookie: sink.request.cookies,
  //     },
  //     fetch,
  //   }),
  //   cache: new InMemoryCache(),
  // });

  // console.time('Page Render');
  const context = {};
  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();

  const FullApp = ({ disableStylesGeneration }) => (
    <ApolloProvider client={client}>
      <StaticRouter location={sink.request.url} context={context}>
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider
            theme={MuiTheme}
            disableStylesGeneration={disableStylesGeneration}
            sheetsManager={new Map()}
          >
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </ApolloProvider>
  );
  FullApp.propTypes = {
    disableStylesGeneration: PropTypes.bool,
  };
  await getDataFromTree(<FullApp disableStylesGeneration={true} />);

  const html = renderToString(sheet.collectStyles(<FullApp />));

  // DOM
  sink.renderIntoElementById('react-root', html);
  // Tags
  const helmet = Helmet.renderStatic();
  sink.appendToHead(
    helmet.title
      .toString()
      .split(' data-react-helmet="true"')
      .join('')
  );
  sink.appendToHead(
    helmet.meta
      .toString()
      .split(' data-react-helmet="true"')
      .join('')
  );
  // Styles
  sink.appendToHead(sheet.getStyleTags());
  sink.appendToBody(
    `<style id="jss-server-side">${sheetsRegistry.toString()}</style>`
  );
  // Data
  sink.appendToHead(`<script>
    window.__APOLLO_STATE__ = ${JSON.stringify(client.extract()).replace(
      /</g,
      '\\u003c'
    )};
  </script>`);
  // console.timeEnd('Page Render');
  // console.timeEnd('Fetch Page');
});
