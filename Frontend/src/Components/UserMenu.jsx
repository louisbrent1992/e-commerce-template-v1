import { MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import styled from "styled-components";

const Container = styled.div``;

const LinkItem = styled(Link)`
	color: inherit;
`;

const SubMenu = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 55vh;
	width: 30vw;
	background: hsl(0 0% 100% /0.1);
	backdrop-filter: blur(0.3rem);
	filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: -1;
	color: ${(props) => props.color};
	text-shadow: ${(props) => props.shadow && "2px 2px 2px rgba(0, 0, 0, 0.7)"};
`;

export default function UserMenu({ desktop, handleSubMenu, expandSub }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.currentUser);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<Container>
			{desktop ? (
				expandSub && (
					<>
						<SubMenu onClick={handleSubMenu}>
							<MenuItem>
								<LinkItem to={`/${currentUser?.username}/account_overview`}>
									Account
								</LinkItem>
							</MenuItem>
							<MenuItem>
								<LinkItem to="/cart/wishlist">Wishlist</LinkItem>
							</MenuItem>
							<MenuItem>
								<LinkItem to="/support">Support</LinkItem>
							</MenuItem>
							<MenuItem onClick={handleLogout} style={{ color: "red" }}>
								Logout
							</MenuItem>
						</SubMenu>
					</>
				)
			) : (
				<>
					<MenuItem>
						<LinkItem to={`/${currentUser?.username}/account_overview`}>
							Account
						</LinkItem>
					</MenuItem>
					<MenuItem>
						<LinkItem to="/cart/wishlist">Wishlist</LinkItem>
					</MenuItem>
					<MenuItem>
						<LinkItem to="/support">Support</LinkItem>
					</MenuItem>
					<MenuItem onClick={handleLogout} style={{ color: "red" }}>
						Logout
					</MenuItem>
				</>
			)}
		</Container>
	);
}
