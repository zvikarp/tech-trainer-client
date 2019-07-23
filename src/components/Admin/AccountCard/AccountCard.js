import React, { Component } from 'react';

import "../../../utils/styles/global.css";
import "./AccountCard.css";

class AccountCard extends Component {

	constructor(props) {
    super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
  }

  onInputChange(e) {
		this.props.onAccountChange(this.props.accountId, e.target.name, e.target.value);
	}
	
	onDelete() {
		this.props.onAccountDelete(this.props.accountId);
	}


	render() {		
		return (
			<div key={this.props.accountId}>
				<div className="labeld-input">
					<label>Name:</label>
					<input
						disabled={this.props.account.type === "website"}
						onChange={this.onInputChange}
						value={this.props.account.name}
						name="name"
						id={this.props.accountId + "name"}
						type="text"
					/>
				</div>
				<div className="labeld-input">
					<label>Points:</label>
					<input
						onChange={this.onInputChange}
						value={this.props.account.points}
						name="points"
						disabled={this.props.account.type !== "website"}
						id={this.props.accountId + "points"}
						type="text"
					/>
				</div>
				<div className="labeld-input">
					<label>Instructions:</label>
					<input
						onChange={this.onInputChange}
						value={this.props.account.instructions}
						name="instructions"
						id={this.props.accountId + "instructions"}
						type="text"
					/>
				</div>
				<div className="labeld-input">
					<label>Type:</label>
					<input
						disabled
						value={this.props.account.type}
						name="type"
						id={this.props.accountId + "type"}
						type="text"
					/>
				</div>
				<button
					disabled={this.props.account.type === "website"}
					className="secondary delete-button"
					onClick={this.onDelete}
				>DELETE</button>
			</div>
		);
	}

	
}

export default AccountCard;