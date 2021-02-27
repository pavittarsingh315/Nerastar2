import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// HOCS
import Layout from './HOCS/Layout';
import HomePage from './HOCS/HomePage';
import Profile from './HOCS/Profile';


// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Containers
import Login from './containers/Login';
import Register from './containers/Register';
import VerifyAccount from './containers/VerifyAccount';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import PageNotFound from './containers/PageNotFound';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute exact path='/users/:username' component={Profile} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/activate/:uid/:token' component={VerifyAccount} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;