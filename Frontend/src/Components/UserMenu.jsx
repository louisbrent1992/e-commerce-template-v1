import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import styled from "styled-components";

const LinkItem = styled(Link)`
	color: #231006;
`;

export default function UserMenu({ anchorEl, handleClose }) {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const currentUser = useSelector((state) => state.user.currentUser);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
		handleClose();
	};

	return (
		<Menu
			id="simple-menu"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<MenuItem onClick={handleClose}>
				<LinkItem to={`/${currentUser.username}/account_overview`}>
					Account
				</LinkItem>
			</MenuItem>
			<MenuItem onClick={handleClose}>
				<LinkItem to="/cart/wishlist">Wishlist</LinkItem>
			</MenuItem>
			<MenuItem onClick={handleClose}>
				<LinkItem to="/support">Support</LinkItem>
			</MenuItem>
			<MenuItem onClick={handleLogout} style={{ color: "red" }}>
				Logout
			</MenuItem>
		</Menu>
	);
}
