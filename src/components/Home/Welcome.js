import React from "react";

const Welcome = ({ userName }) => {
	const isAuthed = userName !== undefined;
	const message = (isAuthed ? "Hi " + userName : "Welcome to Orange") + " 👋";

	return <h1>{message}</h1>;
};

export default Welcome;
