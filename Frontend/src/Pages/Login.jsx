import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile, tablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	min-width: 40%;
	max-width: 55%;
	padding: 20px;
	background-color: white;
`;

const Logo = styled.a`
	font-size: 44px;
	padding-left: 20px;
	color: #252322;
	position: absolute;
	top: 0;
	left: 0;
	font-weight: bold;
	font-family: "Playfair Display", serif;
	cursor: pointer;

	${tablet({ fontSize: "28px" })}
`;

const Title = styled.h2`
	font-weight: 300;
	color: ${(props) => props.theme.tertiary};
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;

	${mobile({ maxWidth: "57%" })}
`;

const Button = styled.button`
	max-width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
	&:disabled {
		color: green;
		cursor: not-allowed;
	}

	${mobile({ maxWidth: "57%" })}
`;

const Anchor = styled.a`
	margin: 5px 0px;

	text-decoration: underline;
	cursor: pointer;

	&:hover {
		transform: scale(1);
	}
`;

const ErrorMessage = styled.span`
	color: red;
	font-weight: bold;
`;

const Message = styled.span`
	color: green;
	font-weight: bold;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isFetching, error, message } = useSelector((state) => state.user);

	const handleClick = async (e) => {
		e.preventDefault();
		setStatusMessage("Logging in...");
		await login(dispatch, { username, password });
		setStatusMessage(message);
		if (isFetching === false)
			setTimeout(() => {
				navigate("/");
			}, 2000);
	};

	return (
		<Container>
			<Logo href="/">{"GR\u221EW"}</Logo>
			<Wrapper>
				<Title>LOGIN</Title>
				<Form>
					<Input
						placeholder="username"
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="password"
						required
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleClick} disabled={isFetching}>
						LOGIN
					</Button>
					{error ? (
						<ErrorMessage>{statusMessage}</ErrorMessage>
					) : (
						<Message>{statusMessage}</Message>
					)}
					{/* TODO: Add forgot password feature. */}
					<Anchor onClick={() => null}>FORGOT PASSWORD?</Anchor>
					<Anchor onClick={() => navigate("/register")}>
						CREATE A NEW ACCOUNT
					</Anchor>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
