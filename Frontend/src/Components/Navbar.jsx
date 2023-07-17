import { Badge } from "@mui/material";
import { ShoppingCartOutlined, Menu, Close } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { desktop, mobile, tablet } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";

const Container = styled.nav`
	position: ${(props) => (props.PosAbsolute ? "absolute" : "relative")};
	padding-inline: 40px;
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
	position: relative;
	display: flex;
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
	font-weight: 700;
	margin: 0;

	&:hover {
		color: #e6b800;
	}
`;

const Cart = styled(ShoppingCartOutlined)`
	color: ${(props) => props.color};
	filter: ${(props) =>
		props.shadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))" : null};
	padding-bottom: 3px;
	&:hover {
		color: #e6b800;
	}
`;

const MenuIcon = styled(Menu)`
	color: ${(props) => props.color};
	cursor: pointer;
	filter: ${(props) =>
		props.shadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))" : null};
`;
const CloseIcon = styled(Close)`
	color: ${(props) => props.color};
	cursor: pointer;
	filter: ${(props) =>
		props.shadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))" : null};
`;

const NavIconsContainer = styled.div`
	${desktop({ display: "none" })};
	${tablet({ display: "none" })};
`;

const Navbar = ({ LinkColor, LinkShadow, PosAbsolute }) => {
	const quantity = useSelector((state) => state.cart.quantity);
	const currentUser = useSelector((state) => state.user.currentUser);

	const [expand, setExpand] = useState(false);
	const [expandSub, setExpandSub] = useState(false);

	const toggleExpand = useCallback(() => {
		setExpand(!expand);
	}, [expand]);

	const toggleSubMenu = useCallback(() => {
		setExpandSub((prevState) => !prevState);
	}, []);

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
							/>
						) : (
							<MenuIcon
								onClick={toggleExpand}
								color={LinkColor}
								shadow={LinkShadow}
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
											<Cart htmlColor={LinkColor} shadow={LinkShadow} />
										</Badge>
									</NavLink>
								</>
							) : (
								<>
									<UserMenu color={LinkColor} shadow={LinkShadow} />
									<NavLink to="/cart">
										<Badge
											badgeContent={quantity}
											color="primary"
											overlap="rectangular"
										>
											<Cart htmlColor={LinkColor} shadow={LinkShadow} />
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
											<Cart htmlColor={LinkColor} shadow={LinkShadow} />
										</Badge>
									</NavLink>
								</>
							) : (
								<>
									<NavLink
										color={LinkColor}
										shadow={LinkShadow}
										onClick={toggleSubMenu}
									>
										user logged in, {currentUser.username}
									</NavLink>
									<UserMenu
										color={LinkColor}
										shadow={LinkShadow}
										expandSub={expandSub}
										handleSubMenu={toggleSubMenu}
										desktop="true"
									/>
									<NavLink to="/cart">
										<Badge
											badgeContent={quantity}
											color="primary"
											overlap="rectangular"
										>
											<Cart htmlColor={LinkColor} shadow={LinkShadow} />
										</Badge>
									</NavLink>
								</>
							)}
						</NavLinksContainer>
					)}
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
