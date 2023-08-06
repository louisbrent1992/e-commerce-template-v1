import { Badge, MenuItem } from "@material-ui/core";
import { ShoppingCartOutlined, Menu, Close } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { desktop, mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { logout } from "../redux/userRedux";

const Container = styled.nav`
	position: ${(props) => (props.PosAbsolute ? "absolute" : "relative")};
	width: 100%;
	z-index: 9;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

const Logo = styled.h1`
	text-shadow: ${(props) =>
		props.shadow ? "2px 2px 2px rgba(0, 0, 0, 0.7)" : null};
	text-transform: uppercase;
	padding-left: 1rem;
	color: ${(props) => props.color};

	&:hover {
		color: #e6b800; /* Bright accent */
	}
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

const ExpandedMenu = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 100vh;
	width: 50vw;
	background: hsl(0 0% 100% /0.1);
	backdrop-filter: blur(0.5rem);
	filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	z-index: -1;
	color: ${(props) => props.color};
	text-shadow: ${(props) => props.shadow && "2px 2px 2px rgba(0, 0, 0, 0.7)"};
`;

const NavLinksContainer = styled.div`
	display: flex;
	padding-right: 1rem;
	align-items: center;
	${mobile({ display: "none" })};
	gap: 1rem;
	color: ${(props) => props.color};
	text-shadow: ${(props) => props.shadow && "2px 2px 2px rgba(0, 0, 0, 0.7)"};
`;

const NavLink = styled(Link)`
	color: inherit;
	text-shadow: ${(props) =>
		props.shadow ? "2px 2px 2px rgba(0, 0, 0, 0.7)" : null};
	font-weight: 500;
	margin: 0;

	&:hover {
		color: #e6b800;
	}
`;

const Cart = styled(ShoppingCartOutlined)`
	color: ${(props) => props.color};
	filter: ${(props) => (!props.shadow ? null : props.shadow)};
	&:hover {
		color: #e6b800;
	}
`;

const MenuIcon = styled(Menu)`
	color: ${(props) => props.color};
	font-size: 33.6px;
	cursor: pointer;
	filter: ${(props) => (!props.shadow ? null : props.shadow)};
`;
const CloseIcon = styled(Close)`
	color: ${(props) => props.color};
	font-size: 33.6px;
	cursor: pointer;
	filter: ${(props) => (!props.shadow ? null : props.shadow)};
`;

const NavIconsContainer = styled.div`
	${desktop({ display: "none" })};
	${tablet({ display: "none" })};
	padding-right: 1rem;
`;

const Navbar = ({ LinkColor, LinkShadow, PosAbsolute }) => {
	const quantity = useSelector((state) => state.cart.quantity);
	const currentUser = useSelector((state) => state.user.currentUser);

	const [expand, setExpand] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleExpand = useCallback(() => {
		setExpand(!expand);
	}, [expand]);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	const cartStyle = {
		height: "100%",
		filter: LinkShadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))" : null,
	};

	const linkStyle = {
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
	};

	return (
		<Container PosAbsolute={PosAbsolute}>
			<Wrapper>
				<Left>
					<NavLink to="/">
						<Logo color={LinkColor} shadow={LinkShadow}>
							RE-DESIGN
						</Logo>
					</NavLink>
				</Left>
				<Right>
					<NavIconsContainer>
						{expand ? (
							<CloseIcon
								onClick={toggleExpand}
								color={LinkColor}
								shadow={LinkShadow}
								style={{
									filter: LinkShadow
										? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))"
										: null,
								}}
							/>
						) : (
							<MenuIcon
								onClick={toggleExpand}
								color={LinkColor}
								shadow={LinkShadow}
								style={{
									filter: LinkShadow
										? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))"
										: null,
								}}
							/>
						)}
					</NavIconsContainer>
					{expand ? (
						<ExpandedMenu color={LinkColor} shadow={LinkShadow}>
							{!currentUser ? (
								<>
									<NavLink to="/register">REGISTER</NavLink>
									<NavLink to="/login">LOGIN</NavLink>
									<NavLink to="/support">SUPPORT</NavLink>
									<NavLink to="/cart">
										<Badge
											badgeContent={quantity}
											color="primary"
											overlap="rectangular"
										>
											<Cart
												style={cartStyle}
												htmlColor={LinkColor}
												shadow={LinkShadow}
											/>
										</Badge>
									</NavLink>
								</>
							) : (
								<>
									<NavLink to={`/${currentUser?.username}/account_overview`}>
										Account
									</NavLink>

									<NavLink to="/cart/wishlist">Wishlist</NavLink>

									<NavLink to="/support">Support</NavLink>

									<MenuItem onClick={handleLogout} style={{ color: "red" }}>
										Logout
									</MenuItem>
									<NavLink to="/cart">
										<Badge
											badgeContent={quantity}
											color="primary"
											overlap="rectangular"
										>
											<Cart
												style={cartStyle}
												htmlColor={LinkColor}
												shadow={LinkShadow}
											/>
										</Badge>
									</NavLink>
								</>
							)}
						</ExpandedMenu>
					) : (
						<NavLinksContainer
							color={LinkColor}
							shadow={LinkShadow}
							mobile={mobile}
						>
							{!currentUser ? (
								<>
									<NavLink to="/register">REGISTER</NavLink>
									<NavLink to="/login">LOGIN</NavLink>
									<NavLink to="/support">SUPPORT</NavLink>
									<NavLink to="/cart">
										<Badge
											badgeContent={quantity}
											color="primary"
											overlap="rectangular"
										>
											<Cart
												style={cartStyle}
												htmlColor={LinkColor}
												shadow={LinkShadow}
											/>
										</Badge>
									</NavLink>
								</>
							) : (
								<UserMenu
									color="primary"
									shadow={LinkShadow}
									desktop="true"
									quantity={quantity}
									cartStyle={cartStyle}
									linkStyle={linkStyle}
								/>
							)}
						</NavLinksContainer>
					)}
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
