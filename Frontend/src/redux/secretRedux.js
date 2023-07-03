import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

export const fetchClientSecret = createAsyncThunk(
	"secret/fetchClientSecret",
	async (products, { rejectWithValue }) => {
		try {
			const response = await publicRequest.post(
				"/stripe/create-payment-intent",
				{
					items: products,
				}
			);

			const data = await response.data;

			return data.clientSecret;
		} catch (error) {
			console.log("Error:", error); // Check if any error occurred
			return rejectWithValue(error.message);
		}
	}
);

const secretSlice = createSlice({
	name: "secret",
	initialState: null,
	reducers: {
		setSecret: (state, action) => action.payload,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchClientSecret.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const { setSecret } = secretSlice.actions;
export default secretSlice.reducer;
