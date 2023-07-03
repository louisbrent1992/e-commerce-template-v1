import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Components/Navbar";

const PageContainer = styled.div`
	height: 100vh;
	padding-top: 60px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f4f4f4;
`;

const Title = styled.h1`
	color: #333;
`;

const InfoSection = styled.section`
	margin: 20px;
	width: 60%;
	border: 1px solid #ddd;
	padding: 20px;
	background-color: #fff;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
	color: #666;
	margin-bottom: 20px;
`;

const InfoText = styled.p`
	color: #333;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;

	height: 100px;
`;

const SubmitButton = styled.button`
	background-color: #5469d4;
	color: #fff;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
`;

const ErrorMessage = styled.p`
	color: red;
`;

const Support = () => {
	const [supportRequest, setSupportRequest] = useState({
		email: "",
		message: "",
	});
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setSupportRequest({ ...supportRequest, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/api/support", supportRequest)
			.then((res) => console.log(res.data))
			.catch((err) => {
				console.error(err);
				setError("Error submitting your request. Please try again later.");
			});
	};

	return (
		<PageContainer>
			<Navbar LinkColor={"black"} />
			<Title>Customer Support</Title>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<InfoSection>
				<InfoTitle>FAQ</InfoTitle>
				<InfoText>
					Q: How do I reset my password? A: To reset your password, go to...
				</InfoText>
			</InfoSection>
			<InfoSection>
				<InfoTitle>Contact Us</InfoTitle>
				<Form onSubmit={handleSubmit}>
					<Input
						type="email"
						name="email"
						placeholder="Your email"
						value={supportRequest.email}
						onChange={handleChange}
						required
					/>
					<TextArea
						name="message"
						placeholder="Your message"
						value={supportRequest.message}
						onChange={handleChange}
						required
					/>
					<SubmitButton type="submit">Submit</SubmitButton>
				</Form>
			</InfoSection>
		</PageContainer>
	);
};

export default Support;
