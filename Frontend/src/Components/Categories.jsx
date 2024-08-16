import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
	display: grid;
	width: 100%;
	overflow: hidden;
	gap: 10px;
	padding: 10px;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

	@media (min-width: 630px) {
		grid-template-columns: repeat(3, 1fr);
	}
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
