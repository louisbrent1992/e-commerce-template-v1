// We're importing the action creators from the userRedux file
import {
	loginFailure,
	loginStart,
	loginSuccess,
	registerFailure,
	registerStart,
	registerSuccess,
} from "./userRedux";
// The publicRequest function is imported from the requestMethods file. This function is responsible for making HTTP requests
import { publicRequest } from "../requestMethods";

// We define an async function login that dispatches actions based on the result of a login attempt
export const login = async (dispatch, user) => {
	// The login process begins so we dispatch the loginStart action
	dispatch(loginStart());
	try {
		// We try to make a POST request to "/login" with the user's credentials
		const res = await publicRequest.post("/api/v1/login", user);
		// If the request is successful, we dispatch the loginSuccess action with the data we got from the response
		dispatch(loginSuccess(res.data));
	} catch (err) {
		// If there's an error (the request fails), we dispatch the loginFailure action
		dispatch(loginFailure());
	}
};

export const register = (newUser) => {
	return async (dispatch) => {
		dispatch(registerStart());

		try {
			const res = await publicRequest.post("/api/v1/register", newUser);
			dispatch(registerSuccess(res.data));
			return res;
		} catch (err) {
			dispatch(registerFailure());
			throw err;
		}
	};
};
