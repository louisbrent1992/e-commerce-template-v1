import { Router, Request, Response } from "express";
import User from "../../Models/User";
import Crypto from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { PASS_SECRET, JWT_SECRET } = process.env;

const router = Router();

// Register a new user
router.post("/register", async (req: Request, res: Response): Promise<void> => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: Crypto.AES.encrypt(req.body.password, PASS_SECRET).toString(),
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login an existing user
router.post(
	"/auth/login",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const user = await User.findOne({
				userName: req.body.user_name,
			});

			// Handle the case where the user doesn't exist
			!user && res.status(401).json("Wrong User Name");

			const hashedPassword = Crypto.AES.decrypt(user.password, PASS_SECRET);
			const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);

			const inputPassword = req.body.password;

			// Handle the case where the password is incorrect
			originalPassword !== inputPassword &&
				res.status(401).json("Wrong Password");

			const accessToken = jwt.sign(
				{
					id: user._id,
					isAdmin: user.isAdmin,
				},
				JWT_SECRET,
				{ expiresIn: "3d" }
			);

			// Exclude the password from the user document in the response
			const { password, ...others } = user;
			res.status(200).json({ ...others, accessToken });
		} catch (err) {
			res.status(500).json(err);
		}
	}
);

export default router;
