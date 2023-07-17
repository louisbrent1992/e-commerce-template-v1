import React from "react";
import styled from "styled-components";
import { tablet } from "../responsive";

// Styled-components section
const OrderCardContainer = styled.div`
	padding: 15px;
	border: 1px solid #bcbcbc;
	border-radius: 10px;
	margin-bottom: 15px;
	display: flex;
	flex-direction: column;
`;

const OrderTitle = styled.h3`
	color: #252322;
	margin-bottom: 10px;
	${tablet({ fontSize: "20px" })}
`;

const OrderText = styled.p`
	color: #666;
	margin: 5px 0;
`;

// OrderCard component
const OrderCard = ({ order }) => {
	return (
		<OrderCardContainer>
			<OrderTitle>Order ID: {order._id}</OrderTitle>
			<OrderText>Customer Name: {order.name}</OrderText>
			<OrderText>Amount: ${order.amount}</OrderText>
			<OrderText>Status: {order.status}</OrderText>
			<OrderText>
				Created At: {new Date(order.createdAt).toLocaleString()}
			</OrderText>
			<OrderText>
				Updated At: {new Date(order.updatedAt).toLocaleString()}
			</OrderText>
			<OrderText>Address: {order.address.line1}</OrderText>
			{/* If you want to display the products in the order, you can map through order.products and display each product information */}
		</OrderCardContainer>
	);
};

export default OrderCard;
