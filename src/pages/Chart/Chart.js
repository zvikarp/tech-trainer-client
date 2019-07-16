import React, { Component } from "react";
import "../../utils/styles/global.css";
import "./Chart.css";
import store from '../../redux/store';
import { logoutUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authed: store.getState().auth.isAuthenticated,
      user: store.getState().auth.user,
    }
  }

  signout = e => {
    this.props.logoutUser();
    window.location.reload();
  }

  renderAuth() {
    if (this.state.authed) {
      return (
        <div className="chart-top-bar">
          <i className="fas fa-cogs settings-button" onClick={() => this.props.history.push('/settings')}></i>
          <button className="secondary" onClick={() => this.signout()}>Sign Out</button>
        </div>
      )
    } else {
      return (
        <div className="chart-top-bar">
          <button className="secondary chart-signin-button" onClick={() => this.props.history.push('/auth')}>Sign In</button>
        </div>
      )
    }
  }

  welcomeMessage() {
    if (this.state.authed) {
      return (
        <h2>Hi {this.state.user.name}!</h2>
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

Chart.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { logoutUser })(Chart);