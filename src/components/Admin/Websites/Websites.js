import React, { Component } from 'react';
// import axios from "axios";

import "../../../utils/styles/global.css";
import "./Websites.css";

class Websites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            websitesFields: {},
            token: localStorage.jwtToken
        }
        // this.getWebsites();
        this.getUsersAccounts();
    }

    getUsersAccounts() {
        // axios.get('/api/user/accounts/get', { headers: { 'token': this.state.token } }).then(res => {
        //     var userAccounts = res.data;
        //     Object.keys(userAccounts).forEach(key => {
        //         this.setState({[key]: userAccounts[key]});
        //         console.log(key);
        //         if (document.getElementById(key))
        //             document.getElementById(key).value = userAccounts[key];

        //     });
        // });
    }


    onAccountChange = e => {
        var websitesFieldsTemp = this.state.websitesFields;
        websitesFieldsTemp[e.target.id] = e.target.value;
        this.setState({ websitesFields: websitesFieldsTemp });
    };

    onChange = e => {
        // var accountsFieldsTemp = this.state.accountsFields;
        // accountsFieldsTemp[e.target.id] = e.target.value;
        // this.setState({ accountsFields: accountsFieldsTemp });
    };

    onSubmit = e => {
        e.preventDefault();
        // this.props.onSignin({ email: this.state.email, password: this.state.password })
        // axios
        //     .post("/api/user/accounts/update", { 'accounts': this.state.accountsFields }, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     })

        //     .then(res => {
        //         console.log(res);

        //     });
    };

    renderWebsiteField(website) {
        return (
            <div key={website.name}>
                <div className="labeld-input">
                    <label>{website.name} points:</label>
                    <input
                        onChange={this.onWebsiteChange}
                        value={website.points}
                        id={website.points}
                        type="text"
                    />
                </div>
            </div>
        );
    }

    renderWebsitesFields() {
        const websites = this.props.websites;
        var websitesFields = [];
        Object.keys(websites).forEach(key => {
            websitesFields.push(this.renderWebsiteField(websites[key]));
        });
        // for (var i = 0; i < websites.length; i++) {
        // }
        return (websitesFields);
    }

    render() {
        return (
            <div id="accounts" >
                <h2 className="signin-title">Websites</h2>
                <form noValidate onSubmit={this.onSubmit}>
                    {this.renderWebsitesFields()}
                    <div className="action-section">
                        <button className="primary signin-button" type="submit">SAVE CHANGES</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Websites;