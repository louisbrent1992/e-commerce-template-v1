import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
	display: flex;
	overflow: hidden;
	padding-block: 10px;
	justify-content: center;
	${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
	return (
		<Container>
			{categories.map((item) => (
				<CategoryItem item={item} key={item.id} />
			))}
		</Container>
	);
};

export default Categories;
