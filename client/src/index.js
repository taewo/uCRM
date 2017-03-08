import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { Home, SignUp, Login, Header } from './components/smartComponents';

import reducers from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Header}>
        <IndexRoute component={Home} />
        <Route path="signup" component={SignUp} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// <Route path="/" component={헤더}>
//   <IndexRoute component={소개} />
//   <Route path="signUp" component={SignUp} />
//   <Route path="logIn" component={LogIn} />
//   <Route path="admin" component={Admin}>
//     fs
//     ds
//     dsf
//     sdf
//   </Route>oute>
//   <Route path="staff" component={Staff}>
//     sdf
//     sdf
//     sdf
//     sdf
//   </Route>
// </Route>
