import React, { Component } from 'react';
import './App.css';

// import Component
import Header from '../src/components/layouts/header';
import Landing from '../src/components/layouts/landing'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Landing></Landing>
      </div>
    );
  }
}

export default App;
