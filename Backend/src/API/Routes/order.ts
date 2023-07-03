import { Request, Response } from 'express';
import Order from '../../Models/Order';

const router = require('express').Router();

// CREATE NEW ORDER
// This endpoint allows for the creation of new orders. It validates the data received in the request body
// and creates a new order using the Order model. If there is an error, it is caught and sent back in the response.
router.post('/orders', async (req: Request, res: Response) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      console.error(err);
      res
        .status(500)
        .json({ message: 'An error occurred while processing your request.' });
    }
  }
});

// UPDATE ORDER
// This endpoint allows for the updating of an existing order. It updates the order in the database
// and returns the updated order in the response.
router.put('/orders/:id', async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while processing your request.' });
  }
});

// DELETE ORDER
// This endpoint allows for the deletion of an existing order. It deletes the order from the database
// and returns a success message in the response.
router.delete('/orders/:id', async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json('Order has been deleted...');
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while processing your request.' });
  }
});

// GET USER ORDERS
// This endpoint returns all the orders associated with a particular user. The user ID is passed as a parameter in the request.
router.get('/orders/:userId', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1
    });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while processing your request.' });
  }
});

// GET ALL ORDERS
// This endpoint returns all the orders in the database.
router.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while processing your request.' });
  }
});

// GET MONTHLY INCOME
// This endpoint calculates the monthly income based on the orders created within the last month. It groups
// the orders by the month they were created and sums the total for each group.
router.get('/income', async (req: Request, res: Response) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount'
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' }
        }
      }
    ]);
    if (income.length === 0) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.status(200).json(income);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while processing your request.' });
  }
});

export default router;
