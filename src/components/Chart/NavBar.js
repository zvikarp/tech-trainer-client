import React from "react";
import { Link } from "react-router-dom";

import { OButton } from "../core";
import navButtons from "../../consts/navButtons";

export default function NavBar(props) {
	const isAuthed = props.userId !== undefined;
	const adminButtons = props.isAdmin ? [navButtons.ADMIN] : [];
	const authedButtons = [navButtons.SETTINGS, navButtons.PROFILE, ...adminButtons];
	const visitorButtons = [navButtons.SIGN_IN];
	const buttons = isAuthed ? authedButtons : visitorButtons
	return (
		<div className="chart-top-bar-right">
			{/* {this.renderAdminButton()} */}
			{buttons.map(button => {
				return (
					<Link to={button.route} key={button.key}>
						<OButton {...button} />
					</Link>
				);
			})}
			{/* <OButton
				text="SETTINGS"
				icon="fas fa-cogs"
				onClick={() => this.props.history.push("/settings")}
			/>
			<OButton
				text="PROFILE"
				icon="fas fa-user"
				onClick={() => this.props.history.push("/profile")}
			/>
			<OButton
				secondary
				text="SIGN OUT"
				onClick={() => this.signout()}
			/> */}
		</div>
	);
}
