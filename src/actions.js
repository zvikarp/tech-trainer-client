export const updateUser = (store, user) => {
	store.setState({
		userId: user.id,
		userName: user.name,
		isAdmin: user.role === "admin",
		isAuthed: true,
	});
	console.log(user);
	
};

export const signoutUser = store => {
	store.setState({
		userId: undefined,
		userName: undefined,
		isAdmin: undefined,
		isAuthed: false,
	});
};

export const getUserId = store => {
	const userId = store.state.userId;
	return userId;
};