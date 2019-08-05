import React, { Component } from "react";

import store from "../../../redux/store";
import { OButton } from "../../core";

import "../../../utils/styles/global.css";
import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSignin({
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    return (
      <div id="signin">
        <h2 className="signin-title"> Sign In </h2>
        <form noValidate onSubmit={this.onSubmit}>
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
					<OButton
					loading={store.getState().auth.loading}
					submit
					type="primary signin-button"
					text="SAVE CHANGES"
				/>
					</div>
        </form>
      </div>
    );
  }
}

export default Signin;
