import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFavProduct } from "../redux/wishlistRedux"; // add this action in your wishlistRedux
import { addProduct } from "../redux/cartRedux";

const Item = styled.div`
	width: 100%;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: start;
	margin-block: 2rem;
	gap: 4rem;
`;

const Image = styled.img`
	max-height: 300px;
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

const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
`;

const AddButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "#252322" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
	cursor: pointer;
`;

const DeleteButton = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
`;

const WishlistItem = ({ item }) => {
	const dispatch = useDispatch();

	const handleAddProduct = () => {
		dispatch(addProduct({ ...item, quantity: 1 }));
	};

	const handleRemove = (id) => {
		dispatch(removeFavProduct(id));
	};

	return (
		<Item key={item._id}>
			<Image
				src={
					item.img ||
					"https://res.cloudinary.com/client-images/image/upload/c_scale,w_360/v1691110086/eCommerce%20Site%20Images/AdobeStock_301378170_inpdne.eps"
				}
				alt={item.title}
			/>
			<div>
				<span>Product Name:</span>
				<ItemName>{item.title}</ItemName>
			</div>

			<div>
				<span>Product ID:</span>
				<ProductID>{item._id}</ProductID>
			</div>
			<ButtonContainer>
				<AddButton type="filled" onClick={handleAddProduct}>
					Add to Cart
				</AddButton>
				<DeleteButton onClick={() => handleRemove(item._id)}>
					<DeleteIcon />
				</DeleteButton>
			</ButtonContainer>
		</Item>
	);
};

export default WishlistItem;
