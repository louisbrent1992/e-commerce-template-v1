import express, { Request, Response } from 'express';
import Review from '../../Models/Review';

const router = express.Router();

// Get all reviews
router.get('/reviews', async (req: Request, res: Response): Promise<any> => {
  try {
    // Fetch all the reviews from the database
    const reviews = await Review.find();
    // Send the reviews back to the client with status 200 (OK)
    res.status(200).json(reviews);
  } catch (error) {
    // Log any errors that occur during the operation
    console.error(error);
    // Send an error message back to the client with status 500 (Internal Server Error)
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving reviews' });
  }
});

// Get a specific review by ID
router.get(
  '/reviews/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      // Find the review with the provided ID
      const review = await Review.findById(id);
      if (!review) {
        // If the review is not found, send a 404 status (Not Found)
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      // If the review is found, send it back to the client with status 200 (OK)
      res.status(200).json(review);
    } catch (error) {
      // Log any errors that occur during the operation
      console.error(error);
      // Send an error message back to the client with status 500 (Internal Server Error)
      res
        .status(500)
        .json({ message: 'An error occurred while retrieving the review' });
    }
  }
);

// Create a new review
router.post('/reviews', async (req: Request, res: Response): Promise<any> => {
  const review = new Review(req.body);

  try {
    // Save the new review to the database
    const newReview = await review.save();
    // Send the newly created review back to the client with status 201 (Created)
    res.status(201).json(newReview);
  } catch (error: any) {
    // Log any errors that occur during the operation
    console.error(error);
    // Send an error message back to the client with status 400 (Bad Request)
    res.status(400).json({ message: error.message });
  }
});

// Update a review by ID
router.put(
  '/reviews/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      // Find the review with the provided ID and update it
      const review = await Review.findByIdAndUpdate(id, req.body, {
        new: true
      });
      if (!review) {
        // If the review is not found, send a 404 status (Not Found)
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      // If the review is found and updated, send it back to the client with status 200 (OK)
      res.status(200).json(review);
    } catch (error: any) {
      // Log any errors that occur during the operation
      console.error(error);
      // Send an error message back to the client with status 400 (Bad Request)
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete a review by ID
router.delete(
  '/reviews/:id',
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      // Find the review with the provided ID and delete it
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        // If the review is not found, send a 404 status (Not Found)
        res.status(404).json({ message: 'Review not found' });
        return;
      }
      // If the review is found and deleted, send a confirmation message to the client with status 200 (OK)
      res.status(200).json({ message: 'Review deleted.' });
    } catch (error) {
      // Log any errors that occur during the operation
      console.error(error);
      // Send an error message back to the client with status 500 (Internal Server Error)
      res
        .status(500)
        .json({ message: 'An error occurred while deleting the review' });
    }
  }
);

export default router;
