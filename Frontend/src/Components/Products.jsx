import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await publicRequest.get(
					cat ? `/api/v1/products?category=${cat}` : `/api/v1/products`
				);
				setProducts(products.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, [cat]);

	useEffect(() => {
		cat &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value)
					)
				)
			);
	}, [products, cat, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	}, [sort]);

	return (
		products.length > 0 && (
			<Container>
				{cat
					? filteredProducts?.map((item) => (
							<Product item={item} key={item._id} />
					  ))
					: products
							?.slice(0, 6)
							.map((item) => <Product item={item} key={item._id} />)}
			</Container>
		)
	);
};

export default Products;
