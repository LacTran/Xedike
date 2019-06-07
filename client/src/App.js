import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

// import Component
import Header from '../src/components/layouts/header';
import Landing from '../src/components/layouts/landing';
import Register from '../src/components/auth/register';
import Login from '../src/components/auth/login';
import NotFound from '../src/components/layouts/NotFound';
import setAuthToken from './util/setAuthToken';
import store from './store';
import { setCurrentUser, logout } from './actions/authActions';
// import Profile from './components/profile/profile'

class App extends Component {

  componentDidMount() {
    if (localStorage && localStorage.token) {
      //check login
      setAuthToken(localStorage.token)
      const decoded = jwtDecode(localStorage.token)
      store.dispatch(setCurrentUser(decoded))

      //check log-out: exp > new Date()
      if (decoded.exp > new Date()) {
        store.dispatch(logout())
        window.location.href = "/login"
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
