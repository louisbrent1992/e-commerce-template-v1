import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../Models/User';
import CryptoJS from 'crypto-js';

const router = express.Router();

// Signup route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, username } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = new User(req.body);

    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'User not found, please register.' });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      res.status(200).json(user);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get(
  '/users',

  async (req: Request, res: Response) => {
    try {
      const query = req.query.new;
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get a specific user by ID
router.get(
  '/users/:id',

  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id !== 'undefined') {
      try {
        const user = await User.findById(id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return; // Don't forget to return after sending a response!
        }

        // Create a new object with the user data and exclude the password
        const { password, ...userWithoutPassword } = user.toObject();

        res.status(200).json(userWithoutPassword);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.json({ message: `User id lookup error: returning ${id}` });
    }
  }
);

// Update a user by ID
router.put(
  '/users/:id',

  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Delete a user by ID
router.delete(
  '/users/:id',

  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

// GET USER STATS
router.get(
  '/stats',

  async (req: Request, res: Response) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' }
          }
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 }
          }
        }
      ]);
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
