import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/', protect, getUserOrders);
router.get('/admin', protect, isAdmin, getAllOrders);

export default router;
