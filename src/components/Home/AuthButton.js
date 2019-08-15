import React from 'react';

import { OButton } from '../core'

const AuthButton = (props) => {

	const signinButton = {
		text: "SIGN IN",
		onClick: (() => {console.log("sdfd");
		}),
	}
	const signoutButton = {
		text: "SIGN OUT",
		onClick: (() => {console.log("sdfd");
		}),
	}
	const button = props.isAuthed ? signoutButton : signinButton;

	return (
		<div>
			<OButton text={button.text} onClick={button.onClick} />
		</div>
	);
}

export default AuthButton;