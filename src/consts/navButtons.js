const buttons = {
	BACK: {
		text: "Back",
		route: "/",
		key: "BACK",
	},
	ADMIN: {
		text: "Admin",
		route: "/admin",
		key: "ADMIN",
	},
	PROFILE: {
		text: "Profile",
		route: "/profile",
		key: "PROFILE",
	},
	HOME: {
		text: "Home",
		route: "/",
		key: "HOME",
	},
	SIGN_OUT: (onClickAction) => {
		return ({
			text: "Sign Out",
			onClick: onClickAction,
			key: "SIGN_OUT",
		});
	},
	SIGN_IN: {
		text: "Sign In",
		route: "/auth",
		key: "SIGN_IN",
	},
};

export default buttons;