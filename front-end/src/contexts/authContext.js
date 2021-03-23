import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
	modalLogin: false,
	modalRegister: false,
	email: null,
	user: {},
	isLogin: false,
	error: null,
	errormail: null,
	users: [
		{
			id: 1,
			email: "user1@gmail.com",
			name: "Aris User",
			type: 1,
			phone: "0987654421",
			img:
				"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
		},
		{
			id: 2,
			email: "user2@gmail.com",
			name: "Aris Partner",
			phone: "0827654421",
			type: 2,
			img:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80",
		},
	],
};

export const reducer = (state, { type, payload }) => {
	// console.log("dari context Auth :", payload);
	switch (type) {
		case "MODAL_LOGIN_OPEN":
			return {
				...state,
				modalLogin: true,
			};
		case "MODAL_LOGIN_CLOSE":
			return {
				...state,
				modalLogin: false,
			};
		case "MODAL_REGISTER_OPEN":
			return {
				...state,
				modalRegister: true,
			};
		case "MODAL_REGISTER_CLOSE":
			return {
				...state,
				modalRegister: false,
			};
		case "LOGOUT":
			console.log("logout");
			return {
				...state,
				user: {},
			};
		case "LOGIN":
			// console.log("login", payload);

			const checkUser = state.users.find((u) => u.email === payload.email);
			if (checkUser) {
				state.user = checkUser;

				return {
					...state,
					error: null,
				};
			} else {
			}

			return {
				...state,
				error: "email tidak di temukan",
			};
		case "REGISTER":
			// console.log("REgister", payload);
			const checkEmail = state.users.find((u) => u.email === payload.email);
			if (checkEmail) {
				return {
					...state,
					modalRegister: true,
					errormail: "email sudah terdaftar",
				};
			}
			return {
				...state,
				errormail: null,
				users: [
					...state.users,
					{
						...payload,
					},
				],
			};
		default:
			return state;
	}
};

export const AuthContextProvaider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<AuthContext.Provider value={[state, dispatch]}>
			{children}
		</AuthContext.Provider>
	);
};
