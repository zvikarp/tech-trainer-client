import React from 'react';

export default function Welcome(props) {

	const isAuthed = props.userName !== undefined;
	const message = isAuthed ? ("Hi " + props.userName) : "Welcome to Orange";
	
	return (
		// TODO: can look better
		<div>
			<h1>
				{message}
				<span role="img" aria-label="emoji">👋</span>
			</h1>
		</div>
	);
}