import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { desktop, mobile } from "../responsive";

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
	transition: all 2s ease;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
	position: relative;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
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
		object-position: top;
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
	width: 100%;

	${mobile({
		justifyContent: "start",
		alignItems: "center",
		gap: "1rem",
		top: "0",
	})}
`;

const Title = styled.h1`
	color: ${(props) => props.color};
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

	${mobile({
		textAlign: "center",
		width: "100%",
		paddingTop: "30px",
	})}
`;

const Desc = styled.p`
	font-weight: 500;
	letter-spacing: 3px;
	color: white;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	text-align: right;

	${mobile({ display: "none" })};
`;
const DescMobile = styled.p`
	font-weight: 500;
	letter-spacing: 3px;
	color: white;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	text-align: center;

	@media screen and (min-width: 480px) {
		display: none;
	}
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

	// Automatically transition to the next slide after 10 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setSlideIndex((prevIndex) =>
				prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
			);
		}, 10000);

		// Cleanup the interval on component unmount
		return () => clearInterval(interval);
	}, []);

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
							<DescMobile>{item.descMobile}</DescMobile>
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
