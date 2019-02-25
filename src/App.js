import React, { Component } from 'react';
import   {Route, BrowserRouter as Router,  Switch}  from 'react-router-dom';

import logo from './logo.svg';

import './App.css';
import Login from './components/Login';
import Heatmap from './components/Heatmap';
import Profile from './components/Profile';

class App extends Component {
  render() {
      return (
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/heatmap/:id" component={Heatmap}/>

          </Switch>
        
        </Router>
      );
    }
}  


export default App;
