export const updateUserId = (store, userId) => {
	store.setState({ userId });
	
};

export const getUserId = (store) => {
	const userId = store.state.userId;
  return userId;
};