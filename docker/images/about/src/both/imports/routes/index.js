import React from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';

import AboutPage from '/both/imports/pages/About';
// import TeamPage from '/both/imports/pages/Team';
// import TechnologyPage from '/both/imports/pages/Technology';
// import ContactPage from '/both/imports/pages/Contact';
// import PrivacyPolicyPage from '/both/imports/pages/PrivacyPolicy';

const Routes = () => (<Switch>
  <Route path="/" exact component={AboutPage}/>
  {/* <Route path="/team" exact component={TeamPage} /> */}
  {/* <Route path="/technology" exact component={TechnologyPage} /> */}
  {/* <Route path="/contact" exact component={ContactPage} /> */}
  {/* <Route path="/privacy-policy" exact component={PrivacyPolicyPage} /> */}
  <Route render={() => <div style={{marginLeft: 50}}><h1>Page not found!</h1><h2>I really need to make this look nicer...</h2></div>}/>
</Switch>)

export default Routes;
