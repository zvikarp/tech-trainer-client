const buttons = {
	BACK: {
		text: "BACK",
		route: "/",
		key: "BACK",
	},
	SETTINGS: {
		text: "SETTINGS",
		route: "/settings",
		key: "SETTINGS",
	},
	ADMIN: {
		text: "ADMIN",
		route: "/admin",
		key: "ADMIN",
	},
	PROFILE: {
		text: "PROFILE",
		route: "/profile",
		key: "PROFILE",
	},
	SIGN_OUT: (onClickAction) => {
		return ({
			text: "SIGN OUT",
			onClick: onClickAction,
			key: "SIGN_OUT",
		});
	},
	SIGN_IN: {
		text: "SIGN IN",
		route: "/auth",
		key: "SIGN_IN",
	},
};

export default buttons;