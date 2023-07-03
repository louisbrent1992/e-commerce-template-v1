import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState: {
		products: [],
	},
	reducers: {
		addFavProduct: (state, action) => {
			const productIndex = state.products.findIndex(
				(product) => product._id === action.payload._id
			);

			if (productIndex === -1) {
				// product not in wishlist, add it
				state.products.push(action.payload);
			}
		},

		removeFavProduct: (state, action) => {
			const productIndex = state.products.findIndex(
				(product) => product._id === action.payload
			);

			if (productIndex !== -1) {
				// remove product from the wishlist
				state.products.splice(productIndex, 1);
			}
		},

		clearWishlist: (state) => {
			state.products = [];
		},
	},
});

export const { addFavProduct, removeFavProduct, clearWishlist } =
	wishlistSlice.actions;
export default wishlistSlice.reducer;
