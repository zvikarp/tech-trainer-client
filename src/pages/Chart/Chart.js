import React, { Component } from "react";
import PropTypes from "prop-types";
import store from "../../redux/store";
import axios from 'axios';
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { TopThree } from "../../components/Chart";
import "../../utils/styles/global.css";
import "./Chart.css";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: store.getState().auth.isAuthenticated,
      user: store.getState().auth.user,
      admin: false,
      token: localStorage.jwtToken
    };
    this.checkIfAdmin();
  }

  checkIfAdmin() {
    axios
      .get("/api/user/admin/get", { headers: { token: this.state.token } })
      .then(res => {
        var isAdmin = res.data.admin;
        console.log(isAdmin);
        
        this.setState({
          admin: isAdmin
        });
      });
  }

  signout = e => {
    this.props.logoutUser();
    window.location.reload();
  };

  renderAdminButton() {
    
    if (this.state.admin) {
      console.log(this.state.admin);
      return (
        <i
        className="fas fa-unlock-alt icon-button chart-icon-button"
        onClick={() => this.props.history.push("/admin")}
        />
        );
    }
  }

  renderAuth() {
    if (this.state.authed) {
      return (
        <div className="chart-top-bar">
          {this.renderAdminButton()}
          <i
            className="fas fa-cogs icon-button chart-icon-button"
            onClick={() => this.props.history.push("/settings")}
          />
          <button className="secondary" onClick={() => this.signout()}>
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="chart-top-bar">
          <button
            className="secondary chart-signin-button"
            onClick={() => this.props.history.push("/auth")}
          >
            Sign In
          </button>
        </div>
      );
    }
  }

  welcomeMessage() {
    if (this.state.authed) {
      return <h2>Hi {this.state.user.name}!</h2>;
    }
  }

  render() {
    return (
      <div>
        <div className="top-section">{this.renderAuth()}</div>
        <h1 className="chart-message">welcome to orange</h1>
        {this.welcomeMessage()}
        <TopThree />
      </div>
    );
  }
}

Chart.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Chart);
