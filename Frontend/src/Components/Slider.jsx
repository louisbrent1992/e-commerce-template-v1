import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	position: relative;
	overflow: hidden;

	${mobile({ height: "50vh" })}
`;

const Arrow = styled.div`
	width: 50px;
	height: 50px;
	background-color: #fff7f7;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 2;

	${mobile({ width: "30px", height: "30px" })}
`;

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	transition: all 1.5s ease;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
		rgba(150, 255, 255, 0.1),
		rgba(150, 255, 255, 0.1)
	);
`;

const AspectRatioBox = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding-bottom: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625 or 56.25%) */
	${mobile({ height: "50vh" })}
	overflow: hidden;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const SlideImg = styled.img``;

const InfoContainer = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding: 50px;
	gap: 2rem;
	z-index: 9;

	${mobile({
		padding: "30px",
		height: "100vh",
		width: "100%",
		bottom: "10rem",
		justifyContent: "center",
		alignItems: "center",
		gap: "1rem",
	})}
`;

const Title = styled.h1`
	color: ${(props) => props.color};
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

	${mobile({
		fontSize: "40px",
		textAlign: "center",
	})}
`;

const Desc = styled.p`
	font-weight: 500;
	letter-spacing: 3px;
	color: white;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
	text-align: right;

	${mobile({
		fontSize: "16px",
		fontWeight: "700",
		textAlign: "left",
		paddingLeft: "30px",
	})}
`;

const Button = styled.button`
	padding: 10px;
	font-size: 20px;
	background-color: white;
	cursor: pointer;
	color: gray;
	transition: transform 0.3s ease;

	&:hover {
		color: ${(props) => props.color}; /* Bright accent */
		transform: scale(1.1);
	}

	${mobile({
		padding: "5px",
		fontWeight: "600",
	})}
`;

const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
		} else {
			setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
		}
	};

	return (
		<Container>
			<Arrow direction="left" onClick={() => handleClick("left")}>
				<ArrowLeftOutlined />
			</Arrow>
			<Wrapper slideIndex={slideIndex}>
				{sliderItems.map((item) => (
					<Slide key={item.id}>
						<InfoContainer>
							<Title color={item.color}>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Button color={item.color}>SHOP NOW</Button>
						</InfoContainer>
						<AspectRatioBox>
							<SlideImg src={item.img} alt={item.desc}></SlideImg>
						</AspectRatioBox>
					</Slide>
				))}
			</Wrapper>
			<Arrow direction="right" onClick={() => handleClick("right")}>
				<ArrowRightOutlined />
			</Arrow>
		</Container>
	);
};

export default Slider;
