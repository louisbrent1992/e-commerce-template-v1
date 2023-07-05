import {
	FavoriteBorderOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addProduct } from "../redux/cartRedux";
import { addFavProduct, removeFavProduct } from "../redux/wishlistRedux";
import { Badge } from "@mui/material";
import { useState } from "react";

const Info = styled.div`
	opacity: ${(props) =>
		props.inCart || props.clicked || props.inWishlist ? 1 : 0};
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
	&:hover {
		opacity: 1;
	}
`;

const Container = styled.div`
	flex: 1;
	margin: 5px;
	min-width: 280px;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;
`;

const Circle = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`;

const Image = styled.img`
	object-fit: contain;
	height: 75%;
	z-index: 2;
	overflow: hidden;
`;

const Icon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${(props) =>
		props.inCart || props.clicked || props.inWishlist ? "#e6b800" : "white"};
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;
	transition: all 0.5s ease;
	&:hover {
		background-color: #e9f5f5;
		transform: scale(1.1);
	}
`;

const Anchor = styled(Link)`
	color: #252322;
	&:hover {
		transform: none;
		color: #252322;
	}
`;

const Product = ({ item }) => {
	const [iconClicked, setIconClicked] = useState(false);
	const cart = useSelector((state) => state.cart);
	const wishlist = useSelector((state) => state.wishlist);
	const dispatch = useDispatch();

	const currentItemInWishlist = wishlist.products.find(
		(product) => product._id === item._id
	);

	const currentItemInCart = cart.products.find(
		(product) => product._id === item._id
	);

	let currentItemQuantity = 0;

	if (cart.products.length > 0) {
		if (currentItemInCart) {
			currentItemQuantity = currentItemInCart.quantity;
		}
	}

	const handleAddProduct = () => {
		dispatch(addProduct({ ...item, quantity: 1 }));
		setIconClicked(true);
	};

	const handleAddFav = () => {
		if (currentItemInWishlist) {
			dispatch(removeFavProduct(item._id));
		}
		if (!currentItemInWishlist) {
			dispatch(addFavProduct(item));
		}
	};

	return (
		<Container>
			<Circle />
			<Image src={item.img} />
			<Info
				inCart={currentItemInCart}
				inWishlist={currentItemInWishlist}
				clicked={iconClicked}
			>
				<Icon
					clicked={iconClicked}
					inCart={currentItemInCart}
					onClick={handleAddProduct}
				>
					<Badge
						badgeContent={currentItemQuantity}
						color="primary"
						overlap="rectangular"
					>
						<ShoppingCartOutlined />
					</Badge>
				</Icon>

				<Icon>
					<Anchor to={`/product/${item._id}`}>
						<SearchOutlined />
					</Anchor>
				</Icon>
				<Icon inWishlist={currentItemInWishlist} onClick={handleAddFav}>
					<FavoriteBorderOutlined />
				</Icon>
			</Info>
		</Container>
	);
};

export default Product;
