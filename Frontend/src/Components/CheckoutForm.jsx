import React, { useState, useEffect } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
	LinkAuthenticationElement,
	AddressElement,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import "./CheckoutForm.css";
import styled from "styled-components";

const Container = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
`;

const Form = styled.form`
	margin-top: 60px;
	min-width: 500px;
	align-self: center;
	box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
		0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
	border-radius: 7px;
	padding: 40px;
`;
const Button = styled.button`
	background: #5469d4;
	font-family: Arial, sans-serif;
	color: #ffffff;
	border-radius: 4px;
	border: 0;
	padding: 12px 16px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	display: block;
	transition: all 0.2s ease;
	box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
	width: 100%;

	&:hover {
		filter: contrast(115%);
	}

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;
const PayMessage = styled.p`
	color: rgb(105, 115, 134);
`;

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const cart = useSelector((state) => state.cart);
	const [email, setEmail] = useState("");
	const [customerName, setCustomerName] = useState("");
	const [shippingData, setShippingData] = useState({});
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const handleAddressChange = (event) => {
			const { value } = event;

			// Use the value object containing the current address information as needed

			setShippingData(value.address);
			setCustomerName(value.name);
		};

		if (elements) {
			const addressElement = elements.getElement(AddressElement);

			// Add the change event listener to the address element
			addressElement.on("change", handleAddressChange);

			// cleanup
			return () => {
				addressElement.off("change", handleAddressChange);
			};
		}
	}, [elements]);

	const createOrder = async () => {
		try {
			const res = await publicRequest.post("/api/v1/orders", {
				userId: currentUser._id,
				name: customerName,
				products: cart.products.map((item) => ({
					productId: item._id,
					quantity: item.quantity,
				})),
				status: "completed",
				amount: cart.total,
				address: shippingData,
			});

			if (res.status === 200) dispatch(clearCart());
			navigate("/success", { state: { type: "order", orderId: res.data._id } });
		} catch (err) {
			setIsLoading(false);
			setMessage("There was an error creating your order. Please try again.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements || !shippingData || !customerName) {
			return;
		}

		setIsLoading(true);

		try {
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				redirect: "if_required",
			});

			if (error) {
				setMessage(error.message);
			} else if (paymentIntent.status === "succeeded") {
				setMessage("Payment successful.");
				// await for the createOrder() to finish before setting isLoading to false
				await createOrder();
			} else {
				setMessage("An unexpected error occurred.");
			}
		} catch (error) {
			setMessage(
				"There was an error processing your payment. Please try again."
			);
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
		business: { name: "GLOW Fashion" },
		wallets: {
			applePay: "auto",
			googlePay: "auto",
		},
	};

	return (
		<Container>
			<Form id="payment-form" onSubmit={handleSubmit}>
				<LinkAuthenticationElement
					id="link-authentication-element"
					onLoginLinkComplete={(result) => setEmail(result.email)}
				/>

				<PaymentElement
					style={{ marginBottom: "24px" }}
					options={paymentElementOptions}
				/>
				<AddressElement options={{ mode: "shipping" }} />

				<Button
					disabled={
						isLoading || !stripe || !elements || !shippingData || !customerName
					}
					id="submit"
				>
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner"></div>
						) : (
							"Pay now"
						)}
					</span>
				</Button>

				{/* Show any error or success messages */}
				{message && <PayMessage id="payment-message">{message}</PayMessage>}
			</Form>
		</Container>
	);
}
