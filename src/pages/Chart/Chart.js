import React, { Component } from "react";
import "../../utils/styles/global.css";
import "./Chart.css";
import store from '../../redux/store';

class Chart extends Component {

  constructor(props) {
    super(props);
    console.log("sfdfsf");
    
    this.state = {
      authed: false,
      user: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   }
    this.setState({
      authed: store.getState().auth.isAuthenticated
    });
    }
    
    renderAuth() {
    if (this.state.authed) {
      return (
        <button className="secondary chart-signin-button" onClick={() => this.props.history.push("/auth")}>Sign Out</button>
      )
    } else {
      return (
        <button className="secondary chart-signin-button" onClick={() => this.props.history.push("/auth")}>Sign In</button>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="top-section">
          {this.renderAuth()}
        </div>
        <h1 className="chart-message">welcome to orange</h1>
      </div>
    );
  }
}
export default Chart;