import { Router, Request, Response } from 'express';
import { Product } from '../../Models/Product';

const router: Router = Router();

// CREATE
router.post('/products/new-product', async (req, res): Promise<void> => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put(
  '/products/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE
router.delete(
  '/products/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been deleted...');
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// GET PRODUCT
router.get(
  '/products/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// GET ALL PRODUCTS
router.get('/products', async (req: Request, res: Response): Promise<void> => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
