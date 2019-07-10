import React, { Component } from 'react'
import authSignin from "../../../services/auth/authSignin"
import authSignup from "../../../services/auth/authSignup"
import NewUser from "../../../models/NewUser"
import "../../../utils/styles/global.css";
import "./Signup.css";

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nickname: "",
            email: "",
            password: "",
        }
    }

    async signupNewUser(newUser) {
        const signupRes = await authSignup(
            newUser.name,
            newUser.nickname,
            newUser.email,
            newUser.password
        );
        console.log(signupRes);
        if (!signupRes.success) return;
        const signinRes = await authSignin(
            newUser.email,
            newUser.password
        );
        console.log(signinRes);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = new NewUser(
            this.state.name,
            this.state.nickname,
            this.state.email,
            this.state.password
        );
        this.signupNewUser(newUser);
        
        
    };

    render() {
        return (
            <div id="signup" >
                <h2 className="signup-title"> Sign Up </h2>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="labeld-input">
                        <label>Full Name:</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            id="name"
                            type="text"
                        />
                    </div>
                    <div className="labeld-input">
                        <label>Nickname:</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.nickname}
                            id="nickname"
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
                        <button className="primary signup-button" type="submit">SIGN UP</button>
                    </div>
                </form>
            </div>
        )
    }
};
export default Signup;