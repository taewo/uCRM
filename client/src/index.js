import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as smartComponents from './components/smartComponents';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
));

// store.subscribe(() => console.log(store.getState().form.registeredFields));

const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={smartComponents.Header}>
        <IndexRoute component={smartComponents.Home} />
        <Route path="signup" component={smartComponents.SignUp} />
        <Route path="login" component={smartComponents.Login} />
        <Route path="space" component={smartComponents.AddSpace} />
        <Route path="selectspace" component={smartComponents.SelectSpace} />
        <Route path="admin" component={smartComponents.Admin}>
          <Route path="manage" component={smartComponents.Manage}>
            <Route path="dashboard" component={smartComponents.Dashboard} />
            <Route path="members">
              <IndexRoute component={smartComponents.Members} />
              <Route path="add" component={smartComponents.AddMembers} />
            </Route>
            <Route path="invoices">
              <IndexRoute component={smartComponents.Invoices} />
              <Route path="add" component={smartComponents.AddInvoices} />
            </Route>
            <Route path="room">
              <IndexRoute component={smartComponents.Room} />
              <Route path="add" component={smartComponents.AddRoom} />
            </Route>
            <Route path="lead">
              <IndexRoute component={smartComponents.Lead} />
              <Route path="add" component={smartComponents.AddLead} />
            </Route>
          </Route>
          <Route path="report" component={smartComponents.Report}>
            <Route path="churn" component={smartComponents.ChurnPage} />
            <Route path="lead" component={smartComponents.LeadPage} />
            <Route path="space" component={smartComponents.SpaceOccupancyPage} />
          </Route>
          <Route path="setting" component={smartComponents.Setting}>
            <Route path="basic" component={smartComponents.Basic} />
            <Route path="billplan">
              <IndexRoute component={smartComponents.BillPlan} />
              <Route path="add" component={smartComponents.AddBillPlan} />
            </Route>
            <Route path="space">
              <IndexRoute component={smartComponents.Space} />
              <Route path="add" component={smartComponents.AddSpace} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
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
