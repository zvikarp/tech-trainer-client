import React, { Component } from "react";
import { User, History } from '../../components/Profile';
import axios from "axios";
import { ToastsStore } from 'react-toasts';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			token: localStorage.jwtToken,
			user: {},
			history: {}
		};
	}
	
	
	componentDidMount() {
		this.getUser();
	}
	
	getUser() {
		axios
			.get("/api/user/get", { headers: { token: this.state.token } })
			.then(res => {
				this.setState({user: res.data.user})				
			}).catch(err => {
				ToastsStore.info("⚠️ Error Loading Data.");
			});
		this.setState({user: this.state.user});
	}

	render() {
		return (
			<div>
				<i className="fas fa-chevron-left icon-button back-button" onClick={() => this.props.history.push('/')}></i>
				<User user={this.state.user} />
				<History />
			</div>
		);
	}

}

export default Profile