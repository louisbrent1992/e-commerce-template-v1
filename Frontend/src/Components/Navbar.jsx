import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { desktop, tablet } from "../responsive";
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
	${tablet({ padding: "10px 0px" })}
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

	${tablet({ fontSize: "24px" })}

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

const MenuItem = styled.span`
	color: ${(props) => props.color};
	font-weight: 700;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: "12px", marginLeft: "10px" })}

	&:hover {
		transform: scale(1.1);
		color: #e6b800;
	}
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
	padding-inline: 20px;
	display: flex;
	${tablet({ display: "none" })};
	gap: 1rem;
	color: ${(props) => props.color};
	text-shadow: ${(props) => props.shadow && "2px 2px 2px rgba(0, 0, 0, 0.7)"};
`;

const NavLink = styled(Link)`
	color: inherit;
	text-shadow: ${(props) =>
		props.shadow ? "2px 2px 2px rgba(0, 0, 0, 0.7)" : null};
	margin-bottom: 5px;
	font-weight: 700;

	&:hover {
		color: #e6b800;
	}
`;

const Cart = styled(ShoppingCartOutlined)`
	color: ${(props) => props.color};
	filter: ${(props) =>
		props.shadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))" : null};

	&:hover {
		color: #e6b800;
	}
`;

const MenuIcon = styled(Menu)`
	color: ${(props) => props.color};
	cursor: pointer;
	filter: ${(props) =>
		props.shadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))" : null};
`;
const CloseIcon = styled(Close)`
	color: ${(props) => props.color};
	cursor: pointer;
	filter: ${(props) =>
		props.shadow ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))" : null};
`;

const NavIconsContainer = styled.div`
	${desktop({ display: "none" })};
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
							tablet={tablet}
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
