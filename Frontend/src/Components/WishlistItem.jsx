import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFavProduct } from "../redux/wishlistRedux"; // add this action in your wishlistRedux

const Item = styled.div`
	width: 80%;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #ddd;
	margin-bottom: 10px;
`;

const Image = styled.img`
	width: 100px;
	object-fit: cover;
`;

const ProductID = styled.p`
	flex: 1;
	text-align: center;
	font-weight: bold;
`;

const ItemName = styled.p`
	flex: 1;
	text-align: center;
	font-weight: bold;
`;

const DeleteButton = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
`;

const WishlistItem = ({ item }) => {
	const dispatch = useDispatch();

	const handleRemove = (id) => {
		dispatch(removeFavProduct(id));
	};

	return (
		<Item key={item._id}>
			<Image src={item.img} alt={item.title} />
			<div>
				<span>Product Name:</span>
				<ItemName>{item.title}</ItemName>
			</div>

			<div>
				<span>Product ID:</span>
				<ProductID>{item._id}</ProductID>
			</div>

			<DeleteButton onClick={() => handleRemove(item._id)}>
				<DeleteIcon />
			</DeleteButton>
		</Item>
	);
};

export default WishlistItem;
