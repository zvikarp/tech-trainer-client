import React, { Component } from 'react';

import { Welcome, Dashboard } from './pages/index.js'

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
      <div className="App">
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
