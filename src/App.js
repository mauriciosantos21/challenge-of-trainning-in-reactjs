import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './store';
import Routes from './routes';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Provider store={store}>
      <Routes />
    </Provider>
  </Fragment>
);

export default App;
