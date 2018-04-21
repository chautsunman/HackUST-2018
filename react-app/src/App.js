import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import MenuAppBar from './AppBar';
import ConversationList from './ConversationList';
import CheckboxListSecondary from './contactList';
import WhiteBoard from './WhiteBoard';
import Chat from './Chat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {

  constructor() {
	  super();
	  this.history = createHistory();
  }

  openChat() {
    console.log('open');
  }

  pageHandler(prev, next) {
	console.log('Page Handler called');
	console.log(prev);
	console.log(next);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MenuAppBar />
          <div className="conversation">
            <Route exact path="/" component={ConversationList} />
          </div>
		  <Route path="/contact-list" component={CheckboxListSecondary} />
		  <Route path="/whiteboard" component={WhiteBoard} />
        </div>
      </Router>
    );
  }
}

export default App;
