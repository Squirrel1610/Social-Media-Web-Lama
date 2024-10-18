const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				user: null,
				isFetching: true,
				err: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				isFetching: false,
				err: false,
			};
		case 'LOGIN_FAILURE':
			return {
				user: null,
				isFetching: false,
				err: true,
			};
		case 'FOLLOW':
			return {
				...state,
				user: {
					...state.user,
					followings: [...state.user.followings, action.payload],
				},
			};
		case 'UNFOLLOW':
			return {
				...state,
				user: {
					...state.user,
					followings: state.user.followings.filter(x => x !== action.payload),
				},
			};
		default:
			return state;
	}
};
export default AuthReducer;
