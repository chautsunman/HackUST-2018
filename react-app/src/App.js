import React, { Component } from 'react';
import MenuAppBar from './AppBar';
import CheckboxListSecondary from './contactList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuAppBar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div align="center">
          <CheckboxListSecondary />
        </div>
      </div>
    );
  }
}

export default App;
