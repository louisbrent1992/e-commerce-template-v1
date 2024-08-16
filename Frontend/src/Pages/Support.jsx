import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	justify-content: center;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://via.placeholder.com/1920x600") center;
	background-size: cover;
`;

const Wrapper = styled.div`
	max-width: 50%;
	padding: 20px;
	background-color: white;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
	${mobile({ width: "75%" })}
`;

const Logo = styled.a`
	font-size: 44px;
	position: absolute;
	top: 0;
	left: 0;
	color: #252322;
	font-weight: bold;
	font-family: "Playfair Display", serif;
	cursor: pointer;
	padding-left: 20px;

	${tablet({ fontSize: "28px" })}
`;

const Title = styled.h2`
	font-weight: 300;
	color: #252322;
	margin-bottom: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
	width: 100%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
	height: 100px;
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;

const SubmitButton = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	border-radius: 5px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #006666; /* Darker shade for hover state */
	}
`;

const ErrorMessage = styled.p`
	color: red;
	margin-top: 10px;
	text-align: center;
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
		<Container>
			<Wrapper>
				<Logo href="/">{"RE-DESIGN"}</Logo>
				<Title>Customer Support</Title>
				{error && <ErrorMessage>{error}</ErrorMessage>}
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
					<ButtonContainer>
						<SubmitButton type="submit">Submit</SubmitButton>
					</ButtonContainer>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Support;
