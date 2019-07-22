import React, { Component } from "react";
import { User, History } from '../../components/Profile';


class Profile extends Component {

	constructor(props) {
		super(props);
		const { data } = this.props.location;
		console.log(data);
		this.state = {
			user: {},
			history: {},
		};
		// this.getUser();
		
	}
	
	getUser() {
		this.setState({user: {name: "zvi karp"}});
		console.log(this.state.user.name);
	}

	getHistory() {
		
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