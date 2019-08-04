import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "../../../utils/styles/global.css";
import "./Top.css";

class Top extends Component {
	onAdminClick() {
		this.props.history.push({
			pathname: '/profile',
			data: {"userId": this.props.user.id}
		});
	}

	renderTop() {
		return (
			<div>
				<div className="top-child top-icon">
					<span role="img" aria-label="emoji">{this.props.icon}</span>
				</div>
				<div className="top-child">
					<h3> {this.props.user.name} </h3>
					<h3> {this.props.user.points} points</h3>
				</div>
			</div>
		);
	}

	render() {
		if (this.props.admin && this.props.user) {
			return (
				<div id="top" className="admin-top-button" onClick={() => this.onAdminClick()}>
					{this.renderTop()}
				</div>
			);
		}
		else if (this.props.user) {
			return (<div id="top">{this.renderTop()}</div>);
		}
		else if (this.props.loaded) {
			return (
				<div id="top" className="top-loading">Don't have a solid top 3 yet! <span role="img" aria-label="emoji">😱</span></div>
			);
		} else {
			return (
				<div id="top" className="top-loading">Loading...</div>
			);
		}
	}

	static propTypes = {
		history: PropTypes.object.isRequired
	}
}

export default withRouter(Top);