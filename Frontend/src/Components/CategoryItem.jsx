import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
	flex: 1;
	height: 70vh;
	position: relative;
	margin: 7px;
	${tablet({ padding: "0px", flex: null, flexWrap: "wrap" })}
`;

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	${mobile({ height: "30vh" })}
`;

const Info = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	gap: 20px;
	text-align: center;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	color: white;
	margin: 0 auto;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);

	${tablet({ fontSize: "24px" })};

	&:hover {
		color: #e6b800;
	}
`;

const Button = styled.button`
	border: 0.3px solid #252322;
	padding: 10px;
	background-color: white;
	color: gray;
	cursor: pointer;
	font-weight: 600;
`;

const CategoryItem = ({ item }) => {
	return (
		<Container mobile={mobile}>
			<Link to={`/products/${item.cat}`}>
				<Image src={item.img} />
				<Info>
					<Title>{item.title}</Title>
					<Button>SHOP NOW</Button>
				</Info>
			</Link>
		</Container>
	);
};

export default CategoryItem;
