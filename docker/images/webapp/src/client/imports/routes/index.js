import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SplashPage from '/client/imports/pages/Splash';
import NewCalculationPage from '/client/imports/pages/NewCalculation';
import GeometryPage from '/client/imports/pages/Geometry';
import ProjectPage from '/client/imports/pages/Project';

// import AboutPage from '/client/imports/pages/About';
// import CalculationPage from '/client/imports/pages/Calculation';
// import CalculationOutputPage from '/client/imports/pages/CalculationOutput';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SplashPage} />
    <Route path="/new-calculation" component={NewCalculationPage} />
    <Route path="/new-project" component={ProjectPage} />
    {/* <Route
      path="/calculation/:primeCalculationId"
      exact
      component={CalculationPage}
    />
    <Route
      path="/calculation/:primeCalculationId/output"
      component={CalculationOutputPage}
    /> */}
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
