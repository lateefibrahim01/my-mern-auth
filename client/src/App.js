import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import ProfilePage from './ProfilePage';
import InfoPage from './InfoPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/info" component={InfoPage} />
      </Switch>
    </Router>
  );
};

export default App;
