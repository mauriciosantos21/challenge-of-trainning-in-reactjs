import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/main';
import Favorites from '../pages/favorites';
import Register from '../pages/register';
import Header from '../components/header';
import Promotion from '../pages/promotion';
import Purchased from '../pages/purchased';

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/favoritos" component={Favorites} />
        <Route path="/cadastro" component={Register} />
        <Route path="/promocoes" component={Promotion} />
        <Route path="/comprados" component={Purchased} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
