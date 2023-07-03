import {
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
	align-items: start;
	padding-block: 20px;
	${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
	flex: 1;
	padding-inline: 20px;
	display: flex;
	flex-direction: column;
`;

const Logo = styled.h1`
	text-align: left;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const SocialContainer = styled.div`
	display: flex;
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
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-inline: 0.5px solid #bcbcbc;

	${mobile({ display: "none" })}
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

const Payment = styled.img`
	width: 50%;
`;

const Link = styled.a`
	width: 50%;
	font-size: 28px;
	margin-bottom: 10px;
	color: #bcbcbc;

	${tablet({ fontSize: "24px" })}
`;

const Footer = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	return (
		<Container>
			<Left>
				<Logo>{"RE-DESIGN"}</Logo>
				<Desc>
					There are many variations of passages of Lorem Ipsum available, but
					the majority have suffered alteration in some form, by injected
					humour, or randomised words which don’t look even slightly believable.
				</Desc>
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
			</Left>

			<Center>
				<Title>Useful Links</Title>
				<List>
					<Link href={"/"}>Home</Link>

					<Link href="/cart">Cart</Link>

					<Link href="/products/women">{mobile ? "Women" : "Shop Women"}</Link>

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

					<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
				</ContentWrapper>
			</Right>
		</Container>
	);
};

export default Footer;
