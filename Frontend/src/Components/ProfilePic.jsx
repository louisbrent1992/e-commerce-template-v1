import React from "react";
import styled from "styled-components";

const AvatarImage = styled.img`
	width: ${(props) => (props.account ? "10rem" : "3rem")};
	height: ${(props) => (props.account ? "10rem" : "3rem")};
	border-radius: 50%;
	object-fit: cover;
`;

const ProfilePic = ({ account, avatar, alt }) => {
	return (
		<AvatarImage
			src={
				avatar ||
				"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
			}
			alt={alt}
			account={account}
		/>
	);
};

export default ProfilePic;
