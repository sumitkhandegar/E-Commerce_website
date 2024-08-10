import orderModel from '../models/orderModel.js';
import Product from '../models/productModel.js';

// getOrdersController
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('products').exec();
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Controller to create a new order
export const createOrderController = async (req, res) => {
    const { products, buyer } = req.body;
    try {
        if (!products || !buyer) {
            return res.status(400).json({ message: 'Products and buyer are required' });
        }

        const newOrder = new orderModel({
            products,
            buyer,
            status: 'Not Processed',
        });
        await newOrder.save();

        if (Array.isArray(products)) {
            const populatedOrder = await orderModel.findById(newOrder._id).populate({
                path: 'products',
                model: 'Products' 
            }).exec();
            res.status(201).json(populatedOrder);
        } else {
            res.status(201).json(newOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get all order for admin
export const getAllOrdersAdminController = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('products').exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller to update an order status
export const updateOrderStatusController = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await updatedOrder.save();
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};