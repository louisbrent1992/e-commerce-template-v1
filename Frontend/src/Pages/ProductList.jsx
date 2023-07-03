import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { categories } from "../data";

const Container = styled.div``;

const BackgroundContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(150, 255, 255, 0.1),
			rgba(150, 255, 255, 0.1)
		),
		url(${(props) => props.bg});
	background-repeat: no-repeat;
	background-size: cover;
`;

const Title = styled.h2`
	margin: 20px;
`;

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
	${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
	font-weight: 600;
	margin-right: 20px;
	${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
	const location = useLocation();
	const cat = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilters = (e) => {
		const value = e.target.value;

		setFilters({
			...filters,
			[e.target.name]: value || "",
		});
	};

	return (
		<Container>
			<BackgroundContainer
				bg={categories.find((item) => item.cat === cat && item.bg)?.bg}
			>
				<Navbar LinkColor="white" LinkShadow />
			</BackgroundContainer>

			<Title>{cat.toUpperCase()}</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option>Color</Option>
						<Option>white</Option>
						<Option>black</Option>
						<Option>red</Option>
						<Option>blue</Option>
						<Option>yellow</Option>
						<Option>green</Option>
					</Select>
					<Select name="size" onChange={handleFilters}>
						<Option>Size</Option>
						<Option>XS</Option>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select onChange={(e) => setSort(e.target.value)}>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price (asc)</Option>
						<Option value="desc">Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products cat={cat} filters={filters} sort={sort} />
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default ProductList;
