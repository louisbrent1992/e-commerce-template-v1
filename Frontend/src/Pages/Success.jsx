import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Heading = styled.h2`
	margin-bottom: 20px;
`;

const Button = styled.button`
	padding: 10px;
	margin-top: 20px;
	background-color: #5469d4;
	color: #ffffff;
	border-radius: 4px;
	border: none;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		filter: contrast(115%);
	}
`;

const Success = () => {
	const location = useLocation();
	const successType = location.state?.type; // get the type of success
	const { orderId } = location.state || "";

	const navigate = useNavigate();

	const handleHomePageNavigation = () => {
		navigate("/");
	};

	return (
		<Container>
			{successType === "order" && orderId ? (
				<Heading>
					Order has been created successfully. Your order number is {orderId}
				</Heading>
			) : successType === "register" ? (
				<Heading>Registration successful!</Heading>
			) : (
				<Heading>Processing...</Heading>
			)}
			<Button onClick={handleHomePageNavigation}>Go to Homepage</Button>
		</Container>
	);
};

export default Success;
