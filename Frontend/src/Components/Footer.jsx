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
	gap: 10px;
	margin-block: 20px;
`;

const Wrapper = styled.div`
	display: flex;
	border: 0.1px solid #bcbcbc;
	padding-block: 10px;
	align-items: start;
	${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
	flex: 1;
	padding-inline: 20px;
	display: flex;
	flex-direction: column;
`;

const Logo = styled.h1`
	margin-top: 10px;
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
	padding: 0 20px 20px 20px;
	display: flex;
	height: 100%;
	justify-content: start;
	align-items: start;
	flex-direction: column;
	${mobile({ borderBlock: "0.1px solid #bcbcbc" })}
	${tablet({ borderInline: "0.1px solid #bcbcbc" })}
`;

const Title = styled.h1`
	width: 100%;
	margin-top: 10px;
	margin-bottom: 30px;
	text-align: left;
`;

const LinkList = styled.div`
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	text-align: left;
	align-items: start;
	gap: 1rem;
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
	gap: 1rem;
`;

const ContactItem = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
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
	color: #bcbcbc;
	margin: 0;
	${mobile({ width: "100%" })}
`;

const Bottom = styled.div`
	width: 100%;
	display: flex;
	padding-top: 10px;
	align-items: flex-end;
	justify-content: space-around;

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

				<Center mobile={mobile}>
					<Title>Useful Links</Title>
					<LinkList>
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
					</LinkList>
				</Center>

				<Right>
					<Title>Contact</Title>
					<ContentWrapper>
						<ContactContainer>
							<ContactItem>
								<Room />
								<Link>1111 W First St, Los Angeles, California 90044</Link>
							</ContactItem>
							<ContactItem>
								<Phone />
								<Link>+1 562 555 5555</Link>
							</ContactItem>
							<ContactItem>
								<MailOutline />
								<Link>
									contact@
									{"RE-DESIGN"}
									.dev
								</Link>
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
							fontSize: "12px",
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
