import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import SplashPage from '/client/imports/pages/Splash';
import NewCalculationPage from '/client/imports/pages/NewCalculation';
import NewProjectPage from '/client/imports/pages/NewProject';
import GeometrySearchPage from '/client/imports/pages/GeometrySearch';
import GeometryPage from '/client/imports/pages/Geometry';
import ProjectPage from '/client/imports/pages/Project';

// import AboutPage from '/client/imports/pages/About';
// import CalculationPage from '/client/imports/pages/Calculation';
// import CalculationOutputPage from '/client/imports/pages/CalculationOutput';

import { lifecycle } from 'recompose';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SplashPage} />
    <Route path="/new-calculation" component={NewCalculationPage} />
    <Route path="/new-project" component={NewProjectPage} />
    <Route path="/geometry-search" component={GeometrySearchPage} />
    <Route
      path="/geometry/:geometryId/calculation/:calculationId"
      component={GeometryPage}
    />
    <Route path="/geometry/:geometryId" component={GeometryPage} />
    <Route path="/project/:projectId" component={ProjectPage} />
    <Route render={() => <h1>Page not found</h1>} />
  </Switch>
);

export default Routes;
