import axios from "axios";

const { REACT_APP_BASE_URL, NODE_ENV } = process.env;

// Define your base URL for axios requests
const BASE_URL =
	NODE_ENV === "production"
		? "https://e-commerce-app-server-v1.onrender.com"
		: REACT_APP_BASE_URL;

// Initialize the token as null
let TOKEN = null;

try {
	// Retrieve the serialized user state from local storage
	const rawUserState = localStorage.getItem("persist:root");

	// If we found something in local storage
	if (rawUserState) {
		// Add error handling for JSON parsing
		try {
			// Parse the serialized state to convert it to a JS object
			const parsedState = JSON.parse(rawUserState);

			// The user state is also serialized, so we parse it again
			const parsedUser = JSON.parse(parsedState?.user);

			// Extract the access token from the user state
			TOKEN = parsedUser?.currentUser?.accessToken;
		} catch (error) {
			console.error("Error parsing state from local storage", error);
		}
	}

	// If anything goes wrong (like the user disabling local storage)
	// we'll catch the error here and print it to the console, preventing
	// our application from crashing
} catch (error) {
	console.error("Error retrieving access token from local storage", error);
}

// Create an axios instance for public requests (those that don't need a token)
// This will use the base URL we defined above for all requests
export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

// Create an axios instance for user requests (those that do need a token)
// If we successfully retrieved the token, we include it in the headers
// as a Bearer token
export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
});
