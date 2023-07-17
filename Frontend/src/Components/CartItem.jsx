import React from "react";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
	decreaseQuantity,
	increaseQuantity,
	removeProduct,
} from "../redux/cartRedux";
import { mobile } from "../responsive";

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
	margin-block: 2rem;
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;

const Image = styled.img`
	max-height: 300px;
	width: 200px;
	object-fit: cover;
	object-position: -20px 0px;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	${mobile({ justifyContent: "center", fontSize: "12px" })}
	gap: 1rem;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColorContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
	display: flex;
	gap: 1rem;
`;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

const Trash = styled(DeleteIcon)`
	cursor: pointer;
`;

function CartItem({ product }) {
	const dispatch = useDispatch();
	return (
		<Product>
			<ProductDetail>
				<Image src={product.img} />
				<Details>
					<ProductName>
						<span>Product:</span> {product.title}
					</ProductName>
					<ProductId>
						<span>Product ID:</span> {product._id}
					</ProductId>
					<ProductColorContainer>
						<span>Color:</span>

						{Array.isArray(product.color) ? (
							product.color.map((color) => (
								<ProductColor key={color} color={color} />
							))
						) : (
							<ProductColor color={product.color} />
						)}
					</ProductColorContainer>

					<ProductSize>
						<span>Size:</span>
						{Array.isArray(product.size)
							? product.size.join(", ")
							: product.size}
					</ProductSize>
				</Details>
			</ProductDetail>
			<PriceDetail>
				<ProductAmountContainer>
					<Add
						style={{ cursor: "pointer" }}
						onClick={() => dispatch(increaseQuantity(product._id))}
					/>
					<ProductAmount>{product.quantity}</ProductAmount>
					{product.quantity === 1 ? (
						<Trash onClick={() => dispatch(removeProduct(product._id))} />
					) : (
						<Remove
							style={{ cursor: "pointer" }}
							onClick={() => dispatch(decreaseQuantity(product._id))}
						/>
					)}
				</ProductAmountContainer>
				<ProductPrice>$ {product.price * product.quantity}</ProductPrice>
			</PriceDetail>
		</Product>
	);
}

export default CartItem;
