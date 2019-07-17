import React, { Component } from 'react';
import { Websites, Fields } from '../../components/Admin';
import axios from "axios";
import '../../utils/styles/global.css';
import './Admin.css';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            websites: {},
            token: localStorage.jwtToken
        }
        this.getWebsites();
    }

    getWebsites() {
        axios.get("/api/accounts/get", { headers: { 'token': this.state.token } }).then(res => {
            var recivedAccounts = res.data;
            console.log(recivedAccounts);
            var websites = [];
            var fields = [];
            Object.keys(recivedAccounts.websites).forEach(key => {
                websites.push(recivedAccounts.websites[key].name);
            });
            Object.keys(recivedAccounts.otherFields).forEach(key => {
                fields.push(recivedAccounts.otherFields[key]);
            });
            this.setState({ websites: recivedAccounts.websites, fields: fields })
        });
    }

    render() {
        return (
            <div>
                <i className="fas fa-chevron-left icon-button back-button" onClick={() => this.props.history.push('/')}></i>
                <Websites websites={this.state.websites}/>
                <Fields fields={this.state.fields}/>
            </div>
        );
    }

}

export default Admin