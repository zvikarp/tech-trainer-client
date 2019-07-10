import React, { Component } from 'react'
import authSignup from "../../../services/auth"
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
        const res = await authSignup(newUser);
        console.log(res);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        // const newUser = {
        //     name: this.state.name,
        //     nickname: this.state.nickname,
        //     email: this.state.email,
        //     password: this.state.password,
        // };
        // console.log(newUser);
        // var http = new XMLHttpRequest();
        // var url = "http://localhost:5000/api/users/register";
        // var params = newUser;
        // console.log("putting");
        // http.open("POST", url, true);
        // // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // // http.onreadystatechange = function() {
        // // if(http.readyState == 4 && http.status == 200) {
        // //     alert(http.responseText);
        // // }
        // // }
        // http.send(params);
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