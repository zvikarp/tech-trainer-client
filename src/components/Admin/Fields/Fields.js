import React, { Component } from 'react';
import axios from "axios";

import "../../../utils/styles/global.css";
import "./Fields.css";

class Fields extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountsFields: {},
            accounts: [],
            email: "",
            password: "",
            token: localStorage.jwtToken
        }
        this.getAccountsTypes();
        this.getUsersAccounts();
    }

    getUsersAccounts() {
        axios.get('/api/user/accounts/get', { headers: { 'token': this.state.token } }).then(res => {
            var userAccounts = res.data;
            Object.keys(userAccounts).forEach(key => {
                this.setState({[key]: userAccounts[key]});
                console.log(key);
                if (document.getElementById(key))
                    document.getElementById(key).value = userAccounts[key];

            });
        });
    }

    getAccountsTypes() {
        axios.get("/api/accounts/get", { headers: { 'token': this.state.token } }).then(res => {
            var recivedAccounts = res.data;
            console.log(recivedAccounts);
            var accounts = [];
            Object.keys(recivedAccounts.websites).forEach(key => {
                accounts.push(recivedAccounts.websites[key].name);
            });
            Object.keys(recivedAccounts.otherFields).forEach(key => {
                accounts.push(recivedAccounts.otherFields[key]);
            });
            this.setState({ accounts: accounts })
        });
    }


    onAccountChange = e => {
        var accountsFieldsTemp = this.state.accountsFields;
        accountsFieldsTemp[e.target.id] = e.target.value;
        this.setState({ accountsFields: accountsFieldsTemp });
    };

    onChange = e => {
        var accountsFieldsTemp = this.state.accountsFields;
        accountsFieldsTemp[e.target.id] = e.target.value;
        this.setState({ accountsFields: accountsFieldsTemp });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.onSignin({ email: this.state.email, password: this.state.password })
        axios
            .post("/api/user/accounts/update", { 'accounts': this.state.accountsFields }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

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

export default Fields;