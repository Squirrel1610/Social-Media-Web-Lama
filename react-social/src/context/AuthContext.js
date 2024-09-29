import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	user: {
		_id: "65d398c9c05c2fdd688d5d95",
		username: "Nguyen Duy Thinh",
		email: "thinhnd04.dev@gmail.com",
		profilePicture: "thinh.jpg",
		coverPicture: "cover_picture3.jpg",
		followings: ["65fbe3100e15dd396bb4cc1e"],
		isAdmin: false,
		createdAt: "2024-02-19T18:07:05.209Z",
		followers: [],
		description: "My nickname is Squirrel",
		city: "Ho Chi Minh",
		from: "Nha Trang",
		relationship: 1,
	},
	isFetching: false,
	err: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				err: state.err,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
