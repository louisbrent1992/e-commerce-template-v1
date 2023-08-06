import React, { useCallback, useState } from "react";
import { Badge, MenuItem } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/material/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";

const Container = styled.div``;

const NavLink = styled(Link)`
	color: inherit;
	text-shadow: ${(props) =>
		props.shadow ? "2px 2px 2px rgba(0, 0, 0, 0.7)" : null};
	font-weight: 500;
	&:hover {
		color: #e6b800;
	}
`;

const SubMenu = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 57vh;
	width: 38vw;
	background: hsl(0 0% 100% /0.1);
	backdrop-filter: blur(0.3rem);
	filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	color: ${(props) => props.color};
	text-shadow: ${(props) => props.shadow && "2px 2px 2px rgba(0, 0, 0, 0.7)"};
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
`;

const Cart = styled(ShoppingCartOutlined)`
	color: ${(props) => props.color};
	&:hover {
		color: #e6b800;
	}
`;

export default function UserMenu({
	desktop,
	LinkColor,
	LinkShadow,
	linkStyle,
	cartStyle,
	quantity,
}) {
	const [expandSub, setExpandSub] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentUser = useSelector((state) => state.user.currentUser);

	const toggleSubMenu = useCallback(() => {
		setExpandSub(!expandSub);
	}, [expandSub]);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<Container>
			{desktop &&
				(expandSub ? (
					<>
						<SubMenu onClick={toggleSubMenu}>
							<UserContainer>
								<NavLink
									color={LinkColor}
									shadow={LinkShadow}
									style={linkStyle}
									onClick={toggleSubMenu}
								>
									<ProfilePic src={currentUser?.avatar} alt="Profile Avatar" />
									user logged in, {currentUser?.username}
								</NavLink>
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
							</UserContainer>

							<NavLink to={`/${currentUser?.username}/account_overview`}>
								Account
							</NavLink>

							<NavLink to="/cart/wishlist">Wishlist</NavLink>

							<NavLink to="/support">Support</NavLink>

							<MenuItem onClick={handleLogout} style={{ color: "red" }}>
								Logout
							</MenuItem>
						</SubMenu>
					</>
				) : (
					<UserContainer>
						<NavLink
							color={LinkColor}
							shadow={LinkShadow}
							onClick={toggleSubMenu}
							style={linkStyle}
						>
							<ProfilePic src={currentUser?.avatar} alt="Profile Avatar" />
							user logged in, {currentUser?.username}
						</NavLink>
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
					</UserContainer>
				))}
		</Container>
	);
}
