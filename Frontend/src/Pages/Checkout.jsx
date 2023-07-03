import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import CheckoutForm from "../Components/CheckoutForm";
import { useSelector } from "react-redux";

import Navbar from "../Components/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Container = styled.div`
	position: "relative";
`;

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Spinner = styled.div`
	border: 16px solid #f3f3f3; /* Light grey */
	border-top: 16px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: ${SpinAnimation} 2s linear infinite;
`;

const LoadingMessage = styled.p`
	margin-top: 20px;
`;

const ErrorMessage = styled.p`
	color: red;
`;

function Checkout() {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
	const clientSecret = useSelector((state) => state.secret);

	const [error, setError] = useState(null);

	const appearance = {
		theme: "flat",
	};

	// Enable the skeleton loader UI for the optimal loading experience.
	const loader = "auto";
	const options = {
		clientSecret,
		appearance,
		loader,
	};

	// If there's an error, display the error message.
	if (error) {
		return <ErrorMessage>{error}</ErrorMessage>;
	}

	// Check clientSecret and return a loading spinner if it does not exist.
	if (!clientSecret) {
		return (
			<LoadingContainer>
				<Spinner></Spinner>
				<LoadingMessage>Preparing your checkout...</LoadingMessage>
			</LoadingContainer>
		);
	}

	return (
		<Container>
			<Navbar LinkColor={"black"} />
			<Elements options={options} stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</Container>
	);
}

export default Checkout;
