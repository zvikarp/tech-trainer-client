import React from 'react';
import ReactTooltip from "react-tooltip";

import { OButton, OInput, ODropdown } from "../core";
import consts from "../../consts/consts";

const AccountCard = (props) => {

	const onInputChange = (e) => {
		props.onAccountChange(props.accountId, e.target.name, e.target.value);
	}

	const onDelete = () => {
		props.onAccountDelete(props.accountId);
	}

	const renderAPIFields = () => {
		if (props.account.type === "api") {
			return (
				<div>
					<OInput
						label="Website Prefix:"
						tooltip="e.g. 'https://api.github.com/users/'"
						onChange={onInputChange}
						value={props.account.perfix}
						name="perfix"
						id={props.accountId + "perfix"}
					/>

					<OInput
						label="Website Suffix:"
						tooltip="e.g. '/repos'"
						onChange={onInputChange}
						value={props.account.suffix}
						name="suffix"
						id={props.accountId + "suffix"}
					/>

					<OInput
						label="Json Path:"
						tooltip="e.g. '.items.length'"
						onChange={onInputChange}
						value={props.account.path}
						name="path"
						id={props.accountId + "path"}
					/>
						<ReactTooltip />
				</div>
			);
		} else {
			return (<div />);
		}
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

			<ODropdown
				label="Type:"
				selected={props.account.type}
				name="type"
				options={consts.TYPES_OF_ACCOUNTS}
				onChange={onInputChange}
			/>

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