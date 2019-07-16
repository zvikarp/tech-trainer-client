import React, { Component } from 'react';
import "../../../utils/styles/global.css";
import "./General.css";

class General extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      points: 0,
    }
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSignin({email: this.state.email, password: this.state.password})
  };

  render() {
    return (
      <div id="general" >
        <h2 className="signin-title">General Settings</h2>
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
            <label>Points:</label>
            <input
              value={this.state.points}
              id="points"
              type="text"
              disabled
            />
          </div>
          <div className="action-section">
            <button className="primary signin-button" type="submit">SAVE CHANGES</button>
          </div>
        </form>
      </div>
    )
  }
}

export default General;