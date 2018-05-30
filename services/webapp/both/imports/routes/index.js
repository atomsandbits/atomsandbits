import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import SplashPage from '/both/imports/pages/Splash';
import ResultsFeed from '/both/imports/pages/ResultsFeed';
import NewCalculationPage from '/both/imports/pages/NewCalculation';
import NewProjectPage from '/both/imports/pages/NewProject';
import GeometrySearchPage from '/both/imports/pages/GeometrySearch';
import GeometryPage from '/both/imports/pages/Geometry';
import ProjectPage from '/both/imports/pages/Project';

// import AboutPage from '/both/imports/pages/About';
// import CalculationPage from '/both/imports/pages/Calculation';
// import CalculationOutputPage from '/both/imports/pages/CalculationOutput';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ResultsFeed} />
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
