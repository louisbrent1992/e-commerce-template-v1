import GlobalStyles from "./globalStyles";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Success from "./Pages/Success";
import Cart from "./Pages/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Checkout from "./Pages/Checkout";
import ScrollPos from "./Components/ScrollPos";
import AccountOverview from "./Pages/Account";
import Support from "./Pages/Support";
const theme = {
	primary: "#665a4e", // Used for paragraph text
	secondary: "#caa789", // Not explicitly used in the CSS but can be applied as needed
	tertiary: "#252322", // Main text color for the body
	accent: "#ffffff", // Text color for buttons
	extra: "#231006", // Main color for headers
	lighterPrimary: "#8b7765", // Softer version of the primary color, not explicitly used
	darkerSecondary: "#9f8d6a", // Used in the button hover state
	complementary: "#7b9caa", // Color for anchor links
	neutralGray: "#bcbcbc", // Neutral gray, can be used for borders or background shades
	brightAccent: "#e6b800", // Background color for buttons
};

const App = () => {
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
