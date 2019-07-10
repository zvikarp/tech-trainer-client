import React, { Component } from 'react';

import { Welcome, Dashboard } from './pages/index.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: true
    }
  }

  renderPage() {
    if (this.state.authed) {
      return (
        <Dashboard onSignout={() => {this.setState({authed:false})}} />
      );
    } else {
      return (
        <Welcome onSignin={() => {this.setState({authed:true})}} />
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
