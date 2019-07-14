import React, { Component } from "react";
import "../../utils/styles/global.css";
import "./Chart.css";
import store from '../../redux/store';

class Chart extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      authed: store.getState().auth.isAuthenticated,
      user: store.getState().auth.user,
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // if (nextProps.auth.isAuthenticated) {
  //   //   }
  //   this.setState({
  //     authed: store.getState().auth.isAuthenticated
  //   });
  //   }
    
    renderAuth() {
    if (this.state.authed) {
      return (
        <div className="chart-top-bar">
          <i className="fas fa-cogs settings-button" onClick={() => this.props.history.push('/settings')}></i>
          <button className="secondary" onClick={() => this.props.history.push('/auth')}>Sign Out</button>
        </div>
      )
    } else {
      return (
        <button className="secondary chart-signin-button" onClick={() => this.props.history.push('/auth')}>Sign In</button>
      )
    }
  }

  welcomeMessage() {
    if (this.state.authed) {
      return (
        <h2>Hi { this.state.user.name }!</h2>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="top-section">
          {this.renderAuth()}
        </div>
        <h1 className="chart-message">welcome to orange</h1>
        {this.welcomeMessage()}
      </div>
    );
  }
}
export default Chart;