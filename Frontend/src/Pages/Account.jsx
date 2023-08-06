import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import OrderCard from "../Components/OrderCard";
import ProfilePic from "../Components/ProfilePic";
import { useNavigate } from "react-router-dom";
import {
	updateUserFailure,
	updateUserStart,
	updateUserSuccess,
} from "../redux/userRedux";

// Styled-components section
const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h1`
	color: #252322;
`;

const InfoSection = styled.section`
	width: 80%;
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #bcbcbc;
	border-radius: 10px;
`;

const InfoTitle = styled.h2`
	color: #252322;
	margin-bottom: 10px;
`;

const InfoText = styled.p`
	color: #666;
`;

const EditButton = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background-color: ${(props) => (props.delete ? "#b30000" : "#0066cc")};
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
	border: 1px solid #bcbcbc;
	border-radius: 5px;
	font-size: 1em;
	width: 100%;
	max-width: 500px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ProfilePicContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
`;

// AccountOverview component
const AccountOverview = () => {
	const [user, setUser] = useState({});
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	// Accessing the Redux store to get the current user
	const currentUser = useSelector((state) => state.user.currentUser);

	const navigate = useNavigate();
	const dispatch = useDispatch();

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
	}, [currentUser]); // Rerun this effect if the user's ID changes

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

	const handleUploadClick = async (e) => {
		// Implement the logic to handle profile picture upload here
		try {
			const formData = new FormData();
			formData.append("avatar", e.target.files[0]);

			// Dispatch the updateUserStart action to set fetching state
			dispatch(updateUserStart());

			const response = await publicRequest.put(
				`/api/v1/users/avatar_upload/${currentUser._id}`,
				formData
			);

			if (response) {
				// Dispatch the updateUserSuccess action with the updated user object

				dispatch(updateUserSuccess(response.data));
				setError(null);
				setIsEditing(false);
			}
		} catch (err) {
			console.error(err);
			// Dispatch the updateUserFailure action in case of error
			dispatch(updateUserFailure());
			setError("Error updating user information. Please try again later.");
		}
	};

	const handleDeleteClick = async () => {
		// Implement the logic to handle account deletion here
		try {
			const response = await publicRequest.delete(
				`/api/v1/users/${currentUser._id}`
			);

			if (response) {
				setError(null);
				// Redirect to the homepage or another appropriate page
				// after successful account deletion
				navigate("/");
			}
		} catch (err) {
			console.error(err);
			setError("Error deleting user account. Please try again later.");
		}
	};

	return (
		<PageContainer>
			<Navbar LinkColor={"#252322"} />
			<Title>Account Overview</Title>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<InfoSection>
				<InfoTitle>Personal Information</InfoTitle>
				{isEditing ? (
					<div>
						<ProfilePicContainer>
							<ProfilePic account avatar={user.avatar} alt={user.alt} />
							<EditButton>
								<input
									style={{ maxWidth: "170px" }}
									type="file"
									accept="image/*"
									onChange={handleUploadClick}
								/>
							</EditButton>
						</ProfilePicContainer>
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
					</div>
				) : (
					<div>
						<ProfilePic account avatar={user.avatar} alt={user.alt} />
						<InfoText>Username: {user.username}</InfoText>
						<InfoText>Email: {user.email}</InfoText>
					</div>
				)}
				<ButtonsContainer>
					<EditButton onClick={handleEditClick}>
						{isEditing ? "Save" : "Edit"}
					</EditButton>
					<EditButton delete onClick={handleDeleteClick}>
						Delete Account
					</EditButton>
				</ButtonsContainer>
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
