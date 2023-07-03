import GlobalStyles from "./globalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import ScrollPos from "./Components/ScrollPos";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import AccountOverview from "./Pages/Account";
import Checkout from "./Pages/Checkout";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Success from "./Pages/Success";
import Support from "./Pages/Support";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const theme = {
	primary: "#665a4e",
	secondary: "#caa789",
	tertiary: "#252322",
	accent: "#ffffff",
	extra: "#231006",
	lighterPrimary: "#8b7765",
	darkerSecondary: "#9f8d6a",
	complementary: "#7b9caa",
	neutralGray: "#bcbcbc",
	brightAccent: "#e6b800",
};

const App = () => {
	const user = useSelector((state) => state.user.currentUser);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Router>
				<ScrollPos />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route
						exact
						path="/:username/account_overview"
						element={<AccountOverview />}
					/>
					<Route path="/products" element={<ProductList />} />
					<Route path="/products/:category" element={<ProductList />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/success" element={<Success />} />
					<Route path="/support" element={<Support />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
