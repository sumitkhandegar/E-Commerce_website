import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { getAllOrdersController,
    createOrderController,
    updateOrderStatusController 
 } from '../controllers/orderController.js';

const router = express.Router();

// create orders
router.post('/orders', createOrderController);

// get orders
router.get('/orders', getAllOrdersController);


// update order status
router.put('/orders/:orderId', updateOrderStatusController);

export default router;