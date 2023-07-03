import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import OrderCard from "../Components/OrderCard";

// Styled-components section
const PageContainer = styled.div`
	padding-top: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h1`
	color: #333;
`;

const InfoSection = styled.section`
	width: 80%;
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 10px;
`;

const InfoTitle = styled.h2`
	color: #333;
	margin-bottom: 10px;
`;

const InfoText = styled.p`
	color: #666;
`;

const EditButton = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background-color: #007bff;
	color: white;
	margin-top: 20px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	margin: 10px 0;
`;

const TextInput = styled.input`
	padding: 10px;
	margin-top: 10px;
	margin-right: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 1em;
	width: 100%;
	max-width: 500px;
`;

// AccountOverview component
const AccountOverview = () => {
	const [user, setUser] = useState({ name: "", email: "" });
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	// Accessing the Redux store to get the current user
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		// Fetch user data when the component mounts
		const fetchUser = async () => {
			try {
				const response = await publicRequest.get(
					`/api/v1/users/${currentUser._id}`
				);
				setUser(response.data);
			} catch (err) {
				console.error(err);
				setError("Error fetching user information. Please try again later.");
			}
		};
		fetchUser();
	}, [currentUser._id]); // Rerun this effect if the user's ID changes

	useEffect(() => {
		// Fetch user data when the component mounts
		const fetchUserOrders = async () => {
			try {
				const response = await publicRequest.get(
					`/api/v1/orders/${currentUser._id}`
				);

				setOrders(response.data);
			} catch (err) {
				console.error(err);
				setError("Error fetching user information. Please try again later.");
			}
		};
		fetchUserOrders();
	}, [currentUser._id]); // Rerun this effect if the user's ID changes

	// Handle click event for the edit button
	const handleEditClick = async () => {
		if (!isEditing) {
			setIsEditing(true);
		} else {
			try {
				const response = await publicRequest.put(
					`/api/v1/users/${currentUser._id}`,
					user
				);
				// If user is updated successfully, clear the error state and toggle isEditing
				if (response) {
					setError(null);
					setIsEditing(false);
				}
			} catch (err) {
				console.error(err);
				setError("Error updating user information. Please try again later.");
			}
		}
	};

	const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<PageContainer>
			<Navbar LinkColor={"black"} />
			<Title>Account Overview</Title>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<InfoSection>
				<InfoTitle>Personal Information</InfoTitle>
				{isEditing ? (
					<>
						<TextInput
							name="username"
							value={user.username}
							onChange={handleInputChange}
						/>
						<TextInput
							name="email"
							value={user.email}
							onChange={handleInputChange}
						/>
					</>
				) : (
					<>
						<InfoText>Username: {user.username}</InfoText>
						<InfoText>Email: {user.email}</InfoText>
					</>
				)}
				<EditButton onClick={handleEditClick}>
					{isEditing ? "Save" : "Edit"}
				</EditButton>
			</InfoSection>
			<InfoSection>
				<InfoTitle>Order History</InfoTitle>
				{orders.map((order) => (
					<OrderCard key={order._id} order={order} />
				))}
			</InfoSection>
		</PageContainer>
	);
};

export default AccountOverview;
