import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
	height: 60vh;
	background-color: ${(props) => props.theme.secondary};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
`;
const Title = styled.h1`
	margin-bottom: 20px;
`;

const Desc = styled.p`
	font-weight: 300;
	margin-bottom: 20px;
	color: white;
	text-shadow: 2px, 2px, 2px, rgba(0 0 0 0.7);
	${mobile({ textAlign: "center" })};
`;

const InputContainer = styled.div`
	width: 50%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
	${mobile({ width: "80%" })}
`;

const Input = styled.input`
	border: none;
	flex: 8;
	padding-left: 20px;
`;

const Button = styled.button`
	flex: 1;
	border: none;
`;

const Newsletter = () => {
	return (
		<Container>
			<Title>Newsletter</Title>
			<Desc>Get timely updates from your favorite products.</Desc>
			<InputContainer>
				<Input placeholder="Your email" />
				<Button>
					<Send />
				</Button>
			</InputContainer>
		</Container>
	);
};

export default Newsletter;
