const Order = require('../models/Order');

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const updateData = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  }
};

module.exports = orderController;
