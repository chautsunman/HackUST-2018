import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuAppBar from './AppBar';
import ConversationList from './ConversationList';
import CheckboxListSecondary from './contactList';
import WhiteBoard from './WhiteBoard';
import Chat from './Chat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  openChat() {
    console.log('open');
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MenuAppBar openChat={this.openChat} />
          <div className="conversation">
            <Route exact path="/" component={ConversationList} />
          </div>
          <Route path="/contact-list" component={CheckboxListSecondary} />
          <Route path="/whiteboard" component={WhiteBoard} />
          <Route path="/chat" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
