import React from 'react';
import { compose, lifecycle } from 'recompose';

import Routes from '/both/imports/routes';
import ResponsiveDrawer from '/both/imports/components/ResponsiveDrawer';

import './styles';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    },
  })
);
const AppPure = (props) => <ResponsiveDrawer content={<Routes />} />;

const App = enhance(AppPure);

export { App };
export default App;
