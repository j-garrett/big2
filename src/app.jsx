import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import cardReducers from './reducers';
import Big2AppContainer from './components/Big2App';
import { socketDispatchers } from './actions';

const store = createStore(
  cardReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Pass reference to the store to sockets for proper dispatch
socketDispatchers(store);

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        path="/"
        component={Big2AppContainer}
      />
      <Route
        path="/(:filter)"
        component={Big2AppContainer}
      />
    </Router>
  </Provider>
);

export default Root;

render(
  <Root />,
  document.getElementById('root')
);
