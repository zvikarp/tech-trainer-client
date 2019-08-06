export const updateUser = (store, user) => {
	store.setState({ userId: user.id, userName: user.name });

};

export const getUserId = (store) => {
	const userId = store.state.userId;
	return userId;
};