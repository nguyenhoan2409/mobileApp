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
      const orderId = req.query.id;
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
        const orderId = req.query.id;
        const { status } = req.body;

        const validStatuses = ['pending', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "An error occurred.", error: error.message });
        next(error);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const orderId = req.query.id;
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  },

  getSalesStats: async (req, res, next) => {
    try {
      const completedOrders = await Order.find({ status: 'completed' });

      let totalRevenue = 0;
      let totalProductsSold = 0;
      let totalOrders = completedOrders.length; 

      completedOrders.forEach(order => {
        totalRevenue += order.totalAmount; 
        order.cart.forEach(item => {
          totalProductsSold += item.quantity;
        });
      });

      res.status(200).json({
        totalRevenue,
        totalProductsSold,
        totalOrders
      });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "An error occurred.", error: error.message });
      next(error);
    }
  },
};

module.exports = orderController;
