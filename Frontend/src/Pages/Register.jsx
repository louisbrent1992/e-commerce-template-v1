import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	max-width: 50%;
	padding: 20px;
	background-color: white;
	${mobile({ width: "75%" })}
`;

const Logo = styled.a`
	font-size: 48px;
	position: absolute;
	top: 0;
	left: 0;
	color: black;
	font-weight: bold;
	font-family: "Playfair Display", serif;
	cursor: pointer;
	padding-left: 20px;

	${tablet({ fontSize: "32px" })}
`;

const Title = styled.h2`
	font-weight: 300;

	color: ${(props) => props.theme.tertiary};
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
`;

const Agreement = styled.span`
	margin: 20px 0px;
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const ErrorMessage = styled.span`
	margin: 0 auto;
	color: red;
`;

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			// handle password mismatch error
			console.log("Passwords do not match!");
			return;
		}

		dispatch(
			register({
				firstName,
				lastName,
				username,
				email,
				password,
			})
		)
			.then((res) => {
				// Only navigate to success page when registration is successful
				navigate("/success", { state: { type: "register" } });
			})
			.catch((error) => {
				setError(error.response.data.message);
			});
	};

	return (
		<Container>
			<Wrapper>
				<Logo href="/">{"RE-DESIGN"}</Logo>

				<Title>CREATE AN ACCOUNT</Title>
				<Form onSubmit={handleRegister}>
					<Input
						placeholder="first name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<Input
						placeholder="last name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<Input
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						placeholder="confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					<ButtonContainer thrownError={error}>
						<Button type="submit">CREATE</Button>
						{error && <ErrorMessage>{error}...</ErrorMessage>}
					</ButtonContainer>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
