import React, { Component } from "react";
import "../../../utils/styles/global.css";
import store from "../../../redux/store";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.onSignup(newUser);
  };

  renderSignupButton() {
    if (store.getState().auth.loading) {
      return (
        <button disabled className="signup-button">
          WORKING ON IT...
        </button>
      );
    } else {
      return (
        <button className="primary signup-button" type="submit">
          SIGN UP
        </button>
      );
    }
  }

  render() {
    return (
      <div id="signup">
        <h2 className="signup-title"> Sign Up </h2>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="labeld-input">
            <label>Name:</label>
            <input
              onChange={this.onChange}
              value={this.state.name}
              id="name"
              type="text"
            />
          </div>
          <div className="labeld-input">
            <label>Email:</label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              id="email"
              type="email"
            />
          </div>
          <div className="labeld-input">
            <label>Password:</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              id="password"
              type="password"
            />
          </div>
          <div className="action-section">{this.renderSignupButton()}</div>
        </form>
      </div>
    );
  }
}
export default Signup;
