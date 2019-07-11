import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Welcome, Dashboard } from './pages/index.js';
import store from './store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: true
    }
  }

  changeAuthed(state) {
    this.setState({
      authed: state
    })
  }

  renderPage() {
    if (this.state.authed) {
      return (
        <Dashboard onSignout={() => this.changeAuthed(false)} />
      );
    } else {
      return (
        <Welcome onSignin={() => this.changeAuthed(true)} />
      );
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Route exact path="/" Component={Welcome} />
          <Route exact path="/dashboard" Component={Dashboard} />
          {/* {this.renderPage()} */}
        </div>
      </Provider>
    );
  }
}

export default App;
