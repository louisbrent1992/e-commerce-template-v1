import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { clearCart } from "../redux/cartRedux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClientSecret } from "../redux/secretRedux";
import WishlistItem from "../Components/WishlistItem";
import CartItem from "../Components/CartItem";
import { clearWishlist } from "../redux/wishlistRedux";

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.viewWishlist ? "space-around" : "space-between"};

	padding: 20px;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "#252322" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
	cursor: pointer;
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50%;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;

const SummaryItem = styled.span`
	margin: 40px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const wishlist = useSelector((state) => state.wishlist);
	const [viewWishlist, setViewWishlist] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (cart.products.length) {
			dispatch(fetchClientSecret(cart.products));
		}
	}, [cart, dispatch]);

	const handleCheckout = (e) => {
		e.preventDefault();
		navigate("/checkout");
	};

	return (
		<Container>
			<Navbar LinkColor={"black"} />
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top viewWishlist={viewWishlist}>
					<TopButton onClick={() => navigate(-1)}>CONTINUE SHOPPING</TopButton>
					<TopTexts>
						<TopText onClick={() => setViewWishlist(false)}>
							Shopping Bag({cart.products.length})
						</TopText>
						<TopText onClick={() => setViewWishlist(true)}>
							Your Wishlist ({wishlist.products.length})
						</TopText>
						<TopText
							onClick={
								viewWishlist
									? () => dispatch(clearWishlist())
									: () => dispatch(clearCart())
							}
						>
							Clear {viewWishlist ? "Wishlist" : "Cart"}
						</TopText>
					</TopTexts>
					{!viewWishlist && (
						<TopButton type="filled" onClick={handleCheckout}>
							CHECKOUT NOW
						</TopButton>
					)}
				</Top>
				<Bottom>
					<Info>
						{viewWishlist
							? wishlist.products.map((product) => (
									<WishlistItem key={product._id} item={product} />
							  ))
							: cart.products.map((product) => (
									<CartItem key={product._id} product={product} />
							  ))}
						<Hr />
					</Info>
					{!viewWishlist && (
						<Summary>
							<SummaryTitle>ORDER SUMMARY</SummaryTitle>
							<SummaryItem>
								<SummaryItemText>Subtotal</SummaryItemText>
								<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
							</SummaryItem>
							<SummaryItem>
								<SummaryItemText>Estimated Shipping</SummaryItemText>
								<SummaryItemPrice>$ 5.90</SummaryItemPrice>
							</SummaryItem>
							<SummaryItem>
								<SummaryItemText>Shipping Discount</SummaryItemText>
								<SummaryItemPrice>$ -5.90</SummaryItemPrice>
							</SummaryItem>
							<SummaryItem type="total">
								<SummaryItemText>Total</SummaryItemText>
								<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
							</SummaryItem>
						</Summary>
					)}
				</Bottom>
			</Wrapper>
			<Footer />
		</Container>
	);
};

export default Cart;
