export const updateUser = (store, user) => {
	store.setState({
		userId: user.id,
		userName: user.name,
		isAdmin: user.role === "admin",
	});
};

export const getUserId = store => {
	const userId = store.state.userId;
	return userId;
};
