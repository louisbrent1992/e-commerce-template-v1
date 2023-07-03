import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			const productIndex = state.products.findIndex(
				(product) => product._id === action.payload._id
			);

			if (productIndex >= 0) {
				// product already in cart, increase its quantity
				state.products[productIndex].quantity += action.payload.quantity;
			} else {
				// product not in cart, add it
				state.products.push(action.payload);
			}

			state.quantity += action.payload.quantity;
			state.total += action.payload.price * action.payload.quantity;
		},

		increaseQuantity: (state, action) => {
			let product = state.products.find(
				(product) => product._id === action.payload
			);
			if (product) {
				product.quantity += 1;
				state.total += product.price;
				state.quantity += 1;
			}
		},
		decreaseQuantity: (state, action) => {
			let product = state.products.find(
				(product) => product._id === action.payload
			);
			if (product && product.quantity > 0) {
				product.quantity -= 1;
				state.total -= product.price;
				state.quantity -= 1;
			}
		},
		removeProduct: (state, action) => {
			const product = state.products.find(
				(product) => product._id === action.payload
			);
			if (product) {
				state.total -= product.price * product.quantity;
				state.quantity -= product.quantity;
				const index = state.products.findIndex(
					(product) => product._id === action.payload
				);
				state.products.splice(index, 1);
			}
		},

		clearCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
	},
});

export const {
	addProduct,
	increaseQuantity,
	decreaseQuantity,
	removeProduct,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
