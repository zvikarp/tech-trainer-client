import React, { Component } from 'react';

import { OButton, OInput } from "../../core";

import "../../../utils/styles/global.css";
import "./AccountCard.css";

class AccountCard extends Component {

	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	onInputChange(e) {
		console.log(e.target.name)
		this.props.onAccountChange(this.props.accountId, e.target.name, e.target.value);
	}

	onDelete() {
		this.props.onAccountDelete(this.props.accountId);
	}

	render() {
		return (
			<div key={this.props.accountId}>

				<OInput
					label="Name:"
					disabled={this.props.account.type === "website"}
					onChange={this.onInputChange}
					value={this.props.account.name}
					name="name"
					id={this.props.accountId + "name"}
				/>

				<OInput
					label="Points:"
					onChange={this.onInputChange}
					value={this.props.account.points}
					name="points"
					disabled={this.props.account.type !== "website"}
					id={this.props.accountId + "points"}
				/>

				<OInput
					label="Instructions:"
					onChange={this.onInputChange}
					value={this.props.account.instructions}
					name="instructions"
					id={this.props.accountId + "instructions"}
				/>

				<OInput
					label="Type:"
					disabled
					value={this.props.account.type}
					name="type"
					id={this.props.accountId + "type"}
					type="text"
				/>

				<OButton
					disabled={this.props.account.type === "website"}
					onClick={this.onDelete}
					customStyle="delete-button"
					secondary
					text="DELETE"
				/>
			</div>
		);
	}
}

export default AccountCard;