import React, { Component } from "react";

import store from "../../../redux/store";
import { OButton } from "../../core";

import "../../../utils/styles/global.css";
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
          <div className="action-section">
					<OButton loading = {store.getState().auth.loading} submit center text="SAVE CHANGES" />
					</div>
        </form>
      </div>
    );
  }
}
export default Signup;
