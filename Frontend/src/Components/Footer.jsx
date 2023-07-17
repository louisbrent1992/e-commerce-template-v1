import {
	CopyrightOutlined,
	Facebook,
	Instagram,
	MailOutline,
	Phone,
	Pinterest,
	Room,
	Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-inline: 20px;
	height: 100vh;
`;

const Wrapper = styled.div`
	display: flex;

	align-items: start;
	${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
	flex: 1;
	padding-inline: 20px;
	display: flex;
	flex-direction: column;
	height: 90vh;
`;

const Logo = styled.h1`
	text-align: left;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const SocialContainer = styled.div`
	display: flex;
	margin-left: 1rem;
`;

const SocialIcon = styled.a`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${(props) => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`;

const Center = styled.div`
	flex: 1;
	padding-inline: 20px;
	display: flex;
	height: 100%;
	justify-content: start;
	align-items: center;
	flex-direction: column;
	border-inline: 0.1px solid #bcbcbc;
	${mobile({ display: "none" })};
`;

const Title = styled.h1`
	width: 100%;
	margin-bottom: 30px;
	text-align: left;
`;

const List = styled.div`
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	text-align: left;
	justify-content: center;

	${tablet({ flexDirection: "column" })}
`;

const Right = styled.div`
	flex: 1;
	padding-inline: 20px;
	flex-direction: column;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const ContactContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ContactItem = styled.div`
	display: flex;
	align-items: center;
`;

const Text = styled.p`
	text-align: left;
	padding: 0;
	margin-left: 1rem;
`;

const CopyrightContainer = styled.footer`
	display: flex;
	align-items: center;
	margin-right: 1rem;

	${mobile({ display: "none" })}
`;
const CopyrightIcon = styled(CopyrightOutlined)``;

const Payment = styled.img`
	object-fit: contain;

	${mobile({ display: "none" })}
`;

const Link = styled.a`
	width: 50%;
	margin-bottom: 10px;
	color: #bcbcbc;
`;

const Bottom = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${mobile({ justifyContent: "center" })}
`;
const Footer = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	return (
		<Container>
			<Wrapper>
				<Left>
					<Logo>Re-Design</Logo>
					<Desc>
						At Re-Design, we're passionate about delivering excellence. Explore
						our diverse range of products designed to enhance your lifestyle.
						With attention to detail and customer satisfaction as our top
						priorities, we guarantee a remarkable shopping experience. Start
						shopping today and find your new favorite look!
					</Desc>
				</Left>

				<Center>
					<Title>Useful Links</Title>
					<List>
						<Link href={"/"}>Home</Link>

						<Link href="/cart">Cart</Link>

						<Link href="/products/women">
							{mobile ? "Women" : "Shop Women"}
						</Link>

						<Link href="/products/men">{mobile ? "Men" : "Shop Men"}</Link>

						<Link href="/products/accessories">Accessories</Link>

						<Link href={currentUser ? "/:username/account_overview" : "/login"}>
							{currentUser ? "My Account" : "Login"}
						</Link>

						<Link href="/cart/wishlist">Wishlist</Link>

						<Link href="/support">Support</Link>

						<Link href="">Terms</Link>
					</List>
				</Center>

				<Right>
					<Title>Contact</Title>
					<ContentWrapper>
						<ContactContainer>
							<ContactItem>
								<Room />
								<Text>1111 W First St, Los Angeles, California 90044</Text>
							</ContactItem>
							<ContactItem>
								<Phone />
								<Text>+1 562 555 5555</Text>
							</ContactItem>
							<ContactItem>
								<MailOutline />
								<Text>
									contact@
									{"RE-DESIGN"}
									.dev
								</Text>
							</ContactItem>
						</ContactContainer>
					</ContentWrapper>
				</Right>
			</Wrapper>

			<Bottom>
				<SocialContainer>
					<SocialIcon href="" color="3B5999">
						<Facebook />
					</SocialIcon>
					<SocialIcon href="" color="E4405F">
						<Instagram />
					</SocialIcon>
					<SocialIcon href="" color="55ACEE">
						<Twitter />
					</SocialIcon>
					<SocialIcon href="" color="E60023">
						<Pinterest />
					</SocialIcon>
				</SocialContainer>
				<CopyrightContainer>
					<CopyrightIcon style={{ fontSize: "small" }} />
					<Link
						style={{
							width: "100%",
							fontSize: "16px",
							color: "#252322",
							fontWeight: "600",
						}}
						src=""
					>
						2023 Advent Hub Innovations llc.
					</Link>
				</CopyrightContainer>
				<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
			</Bottom>
		</Container>
	);
};

export default Footer;
