import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import styled from "styled-components";

const Container = styled.div``;

const Home = () => {
	return (
		<Container>
			<Navbar PosAbsolute="true" LinkColor="white" LinkShadow="true" />
			<Slider />
			<Categories />
			<Products />
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default Home;
