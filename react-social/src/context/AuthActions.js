export const LoginStart = (userCredentials) => ({
	type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
	type: "LOGIN_SUCCESS",
	payload: user,
});

export const LoginFailure = (err) => ({
	type: "LOGIN_FAILURE",
	payload: err,
});

export const Follow = (userId) => ({
	type: "FOLLOW",
	payload: userId
})

export const Unfollow = (userId) => ({
	type: 'UNFOLLOW',
	payload: userId,
});
