import express, { Request, Response } from "express";
import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;

// Initialize the Stripe API with your secret key
const stripeApi = new stripe(STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// Calculate the total amount in the cart
const calculateCartTotal = (items: any) => {
	let total = 0;
	for (let item of items) {
		total += item.price * item.quantity;
	}
	// Convert total to cents and round to an integer
	return Math.round(total * 100);
};

// Get all charges
router.get("/charges", async (req: Request, res: Response): Promise<void> => {
	try {
		const charges = await stripeApi.charges.list();
		res.json(charges);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Get a specific charge by ID
router.get(
	"/charges/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const chargeId = req.params.id;
			const charge = await stripeApi.charges.retrieve(chargeId);
			res.json(charge);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	}
);

// Handle Stripe webhooks
router.post("/webhooks", async (req: Request, res: Response): Promise<void> => {
	try {
		const stripeSignature = req.headers["stripe-signature"];
		const event = stripeApi.webhooks.constructEvent(
			req.body,
			stripeSignature as string,
			STRIPE_WEBHOOK_SECRET as string
		);

		// Handle the event
		switch (event.type) {
			case "payment_intent.succeeded":
				// Handle payment intent succeeded event
				res.status(200).json({ message: "Payment succeeded" });
				break;
			case "payment_intent.payment_failed":
				// Handle payment intent payment failed event
				res.status(400).json({ message: "Payment failed" });
				break;
			default:
				// Unexpected event type
				res.status(400).json({ message: "Unhandled event type" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Create a new payment intent
router.post(
	"/create-payment-intent",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { items } = req.body;
			const cartTotal = calculateCartTotal(items);

			// Create a PaymentIntent with the order amount and currency
			const paymentIntent = await stripeApi.paymentIntents.create({
				amount: cartTotal,
				currency: "usd",
				payment_method_types: ["card"],
			});

			res.send({
				clientSecret: paymentIntent.client_secret,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	}
);

// Refund a charge
router.post(
	"/charges/refund",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { chargeId } = req.body;
			const refund = await stripeApi.refunds.create({
				charge: chargeId,
			});
			res.json(refund);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	}
);

export default router;
