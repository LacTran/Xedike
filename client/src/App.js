import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import Component
import Header from '../src/components/layouts/header';
import Landing from '../src/components/layouts/landing';
import Register from '../src/components/auth/register';
import Login from '../src/components/auth/login';
import NotFound from '../src/components/layouts/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/"  component={NotFound} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
