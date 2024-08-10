import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { getAllOrdersController,
    createOrderController,
    updateOrderStatusController,
    getAllOrdersAdminController
 } from '../controllers/orderController.js';

const router = express.Router();

// create orders
router.post('/orders', createOrderController);

// get orders
router.get('/orders', getAllOrdersController);

// get all orders
router.get('/all-orders', getAllOrdersAdminController);

// update order status
router.put('/order-status/:orderId', updateOrderStatusController);

export default router;