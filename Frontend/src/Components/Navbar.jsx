import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";

const Container = styled.div`
	position: absolute;
	padding-inline: 20px;
	top: 0;
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
	color: white;
	text-shadow: ${(props) =>
		props.shadow ? "2px 2px 2px rgba(0, 0, 0, 0.5)" : null};

	color: ${(props) => props.color};
	${mobile({ fontSize: "24px" })}

	&:hover {
		color: #e6b800; /* Bright accent */
	}
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
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

const NavLink = styled(Link)`
	color: ${(props) => props.color};
	text-shadow: ${(props) =>
		props.shadow ? "2px 2px 2px rgba(0, 0, 0, 0.5)" : null};

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

const Navbar = ({ LinkColor, LinkShadow }) => {
	const quantity = useSelector((state) => state.cart.quantity);
	const currentUser = useSelector((state) => state.user.currentUser);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Container>
			<Wrapper>
				<Left>
					<NavLink to="/">
						<Logo color={LinkColor} shadow={LinkShadow}>
							{"RE-DESIGN"}
						</Logo>
					</NavLink>
				</Left>
				<Right>
					{!currentUser ? (
						<>
							<NavLink color={LinkColor} shadow={LinkShadow} to="/register">
								<MenuItem>REGISTER</MenuItem>
							</NavLink>
							<NavLink color={LinkColor} shadow={LinkShadow} to="/login">
								<MenuItem>LOGIN</MenuItem>
							</NavLink>
							<NavLink color={LinkColor} shadow={LinkShadow} to="/support">
								<MenuItem>SUPPORT</MenuItem>
							</NavLink>
						</>
					) : (
						<>
							<MenuItem
								color={LinkColor}
								shadow={LinkShadow}
								onClick={handleClick}
							>
								user logged in, {currentUser.username}
							</MenuItem>

							<UserMenu anchorEl={anchorEl} handleClose={handleClose} />
						</>
					)}

					<NavLink to="/cart">
						<MenuItem>
							<Badge
								badgeContent={quantity}
								color="primary"
								overlap="rectangular"
							>
								<Cart htmlColor={LinkColor} shadow={LinkShadow} />
							</Badge>
						</MenuItem>
					</NavLink>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
