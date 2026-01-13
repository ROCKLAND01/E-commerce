import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    if (req.user.isAdmin) {
        return res.status(403).json({ message: "Admins cannot place orders." });
    }

    const order = await Order.create({
        user: req.user.id,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        totalPrice: req.body.totalPrice,
        isPaid: true // demo payment
    });

    res.status(201).json({
        message: "Payment successful",
        order
    });
};

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
