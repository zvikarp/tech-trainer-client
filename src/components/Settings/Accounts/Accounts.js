import React, { Component } from 'react';
import axios from "axios";

import "../../../utils/styles/global.css";
import "./Accounts.css";

class Accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountsFields: {},
            accounts: ['github', 'medium'],
            email: "",
            password: "",
            token: localStorage.jwtToken
        }
        this.getAccountsTypes();
    }

    getAccountsTypes() {
        axios
            .get("/api/accounts/get", {headers: {'token': this.state.token}})
            
            .then(res => {
                var recivedAccounts = res.data;
                console.log(recivedAccounts);
                var accounts = [];
                Object.keys(recivedAccounts.websites).forEach(key => {
                    accounts.push(recivedAccounts.websites[key].name);
                });
                Object.keys(recivedAccounts.otherFields).forEach(key => {
                    accounts.push(recivedAccounts.otherFields[key]);
                });
                this.setState({accounts: accounts})
            });
    }


    onAccountChange = e => {
        console.log(e.target.id);

        this.setState({ [e.target.id]: e.target.value });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.onSignin({ email: this.state.email, password: this.state.password })
        axios
        .post("/api/user/accounts/update", {'accounts': {'SDFSDFSDFS': 'zvik'}}, {
            headers: {
                'Content-Type': 'application/json',
            }})
        
        .then(res => {
            console.log(res);
            
        });
    };

    renderAccountField(account) {
        return (
            <div key={account}>
                <div className="labeld-input">
                    <label>{account}:</label>
                    <input
                        onChange={this.onAccountChange}
                        value={this.state.name}
                        id={account}
                        type="text"
                    />
                </div>
            </div>
        );
    }

    renderAccountFields() {
        const accounts = this.state.accounts;
        var accountsFields = [];
        for (var i = 0; i < accounts.length; i++) {
            accountsFields.push(this.renderAccountField(accounts[i]));
        }
        return (accountsFields);
    }

    render() {
        return (
            <div id="accounts" >
                <h2 className="signin-title">Connected Accounts Settings</h2>
                <form noValidate onSubmit={this.onSubmit}>
                    {this.renderAccountFields()}
                    <div className="action-section">
                        <button className="primary signin-button" type="submit">SAVE CHANGES</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Accounts;