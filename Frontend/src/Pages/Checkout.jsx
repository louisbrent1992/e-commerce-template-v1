import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import CheckoutForm from "../Components/CheckoutForm";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

const Container = styled.div`
	position: relative;
	background-color: white;
	display: flex;
`;

const LeftContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	flex-direction: column;
	background-color: white;
	padding: 20px;
`;

const RightContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding-block: 20px;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header``;

const TitleLink = styled(Link)``;

const Title = styled.h2`
	color: #252322;
	font-weight: 900;
`;

const ProductsList = styled.div``;

const Product = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-block: 2rem;
	gap: 0.5rem;
`;

const ProductName = styled.h2`
	color: #252322;
	font-weight: 900;
`;

const ProductPrice = styled.span`
	font-weight: 500;
`;

const Image = styled.img`
	max-height: 300px;
	width: 200px;
	object-fit: cover;
	background-color: #7b9caa;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	border-radius: 7px;
`;

const Quantity = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
	gap: 5px;
`;

const Label = styled.span``;

const Footer = styled.footer`
	margin-top: auto;
	color: #808080;
	font-weight: 500;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
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

	const cart = useSelector((state) => state.cart);

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
			<LeftContainer>
				<Header>
					<TitleLink to="/">Re-Design</TitleLink>
				</Header>
				<ProductsList>
					{cart.products.map((product) => (
						<Product key={product._id}>
							<ProductName>{product.title}</ProductName>
							<ProductPrice>${product.price}</ProductPrice>
							<Image src={product.img} alt={product.desc} />
							<Quantity>
								<Label>Quantity:</Label>
								{product.quantity}
							</Quantity>
						</Product>
					))}
				</ProductsList>

				<Footer>Powered by Stripe</Footer>
			</LeftContainer>
			<RightContainer>
				<Title>Pay With Card</Title>
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			</RightContainer>
		</Container>
	);
}

export default Checkout;
