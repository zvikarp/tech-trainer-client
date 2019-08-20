import React from 'react';

import { OButton, OInput, ODropdown } from "../core";

const AccountCard = (props) => {

	const onInputChange = (e) => {
		props.onAccountChange(props.accountId, e.target.name, e.target.value);
	}

	const onDelete = () => {
		props.onAccountDelete(props.accountId);
	}

	const renderAPIFields = () => {
		return (
			<div>
				<OInput
					label="Website Prefix:"
					onChange={onInputChange}
					value={props.account.name}
					name="name"
					id={props.accountId + "name"}
				/>

				<OInput
					label="Website Suffix:"
					onChange={onInputChange}
					value={props.account.points}
					name="points"
					disabled={props.account.type !== "website"}
					id={props.accountId + "points"}
				/>

				<OInput
					label="Json Path:"
					onChange={onInputChange}
					value={props.account.instructions}
					name="instructions"
					id={props.accountId + "instructions"}
				/>
			</div>
		);
	}

	return (
		<div key={props.accountId}>

			<OInput
				label="Name:"
				onChange={onInputChange}
				value={props.account.name}
				name="name"
				id={props.accountId + "name"}
			/>

			<OInput
				label="Points:"
				onChange={onInputChange}
				value={props.account.points}
				name="points"
				id={props.accountId + "points"}
			/>

			<OInput
				label="Instructions:"
				onChange={onInputChange}
				value={props.account.instructions}
				name="instructions"
				id={props.accountId + "instructions"}
			/>

			<OInput
				label="Type:"
				value={props.account.type}
				name="type"
				id={props.accountId + "type"}
				type="text"
			/>

			<ODropdown />

			{renderAPIFields()}

			<OButton
				onClick={onDelete}
				customStyle="delete-button"
				secondary
				text="DELETE"
			/>

		</div>
	);
}

export default AccountCard;