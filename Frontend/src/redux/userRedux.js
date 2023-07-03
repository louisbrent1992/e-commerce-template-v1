// We're importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// We define a slice of the Redux store for the user functionality
const userSlice = createSlice({
	// The name of the slice is "user"
	name: "user",
	// This is the initial state of the user: no current user, not fetching, and no error
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	// The reducers for the slice are defined here
	reducers: {
		// When a loginStart action is dispatched, isFetching is set to true to indicate the start of a login attempt
		loginStart: (state) => {
			state.isFetching = true;
		},
		// When a loginSuccess action is dispatched, isFetching is set to false, the current user is updated with the payload from the action, and any error is cleared
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
		},
		// When a loginFailure action is dispatched, isFetching is set to false and the error flag is set to true to indicate a login failure
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		// Similar actions for registration process
		registerStart: (state) => {
			state.isFetching = true;
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
		},
		registerFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		logout: (state) => {
			state.isFetching = false;
			state.currentUser = null;
			state.error = false;
		},
	},
});

// We export the action creators for this slice of the state for use in other parts of the application
export const {
	loginStart,
	loginSuccess,
	loginFailure,
	registerStart,
	registerSuccess,
	registerFailure,
	logout,
} = userSlice.actions;
// We also export the reducer function for this slice of the state
export default userSlice.reducer;
