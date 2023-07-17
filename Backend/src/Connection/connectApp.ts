import express, {
	Express,
	Request,
	Response,
	NextFunction,
	Router,
} from "express";
import cors from "cors";
import reviewRouter from "../API/Routes/review";
import userRouter from "../API/Routes/user";
import productRouter from "../API/Routes/product";
import ordersRouter from "../API/Routes/order";
import stripeRouter from "../API/Stripe/stripeRouter";
import path from "path";

// Create a class to configure and start the Express application
class ConnectApp {
	private app: Express;
	private router: Router;

	constructor(private readonly port: string) {
		// Create a new Express application instance
		this.router = Router();
		this.app = express();
		this.config();
		this.routes();
		this.errorCatcher();
	}

	// Configure middleware and settings for the Express application
	private config() {
		// Enable Cross-Origin Resource Sharing (CORS) middleware
		this.app.use(
			cors({
				origin:
					process.env.NODE_ENV === "production"
						? ["https://e-commerce-app-v1.onrender.com"]
						: [
								"http://localhost:3000",
								"https://e-commerce-app-v1.onrender.com",
						  ],
				methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
				preflightContinue: false,
				optionsSuccessStatus: 204,
			})
		);

		// Use express.urlencoded middleware to parse x-www-form-urlencoded data
		this.app.use(express.urlencoded({ extended: true }));

		// Parse request bodies in JSON format middleware
		this.app.use(express.json());

		// Serve static files from the 'public' directory
		this.app.use(express.static("public"));

		// Add the Content-Security-Policy header
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.setHeader(
				"Content-Security-Policy",
				"connect-src 'self' https://api.stripe.com"
			);
			next();
		});
	}

	// Configure the routes for the Express application
	private routes() {
		// Route to serve the index page
		this.app.use("^/$|/index(.html)?", (req: Request, res: Response) => {
			res.sendFile(
				path.resolve(__dirname, "../../public", "Views", "index.html")
			);
		});

		// Route to handle reviews and users APIs
		this.app.use(
			"/api/v1",
			reviewRouter,
			userRouter,
			productRouter,
			ordersRouter
		);

		// Route to handle Stripe APIs
		this.app.use("/stripe", stripeRouter);
	}

	// Configure the error handling middleware
	private errorCatcher() {
		// Handle 404 errors
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res
				.status(404)
				.sendFile(path.resolve(__dirname, "../../public", "Views", "404.html"));
		});

		// Handle other errors
		this.app.use(
			(err: Error, req: Request, res: Response, next: NextFunction) => {
				console.error(err.stack);
				res.status(500).json({ message: "Internal server error" });
			}
		);
	}

	// Start the Express server on the specified port
	public start() {
		this.app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}.`);
		});
	}
}

export default ConnectApp;
