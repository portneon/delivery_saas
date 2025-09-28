const prisma = require('../lib/prisma');

async function getOrderItems(req, res) {
    const { orderId } = req.params;
    try {
        const data = await prisma.orderItem.findMany({ where: { orderId } });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching order items", error: err.message });
    }
}

async function postOrderItem(req, res) {
    const { orderId } = req.params;
    const { productId, quantity, price } = req.body;
    try {
        const data = await prisma.orderItem.create({ data: { orderId, productId, quantity, price } });
        res.status(201).json({ message: "Order item created", item: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating order item", error: err.message });
    }
}

async function updateOrderItem(req, res) {
    const { id } = req.params;
    const { quantity, price } = req.body;
    try {
        const data = await prisma.orderItem.update({ where: { id }, data: { quantity, price } });
        res.status(202).json({ message: "Order item updated", item: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating order item", error: err.message });
    }
}

async function deleteOrderItem(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.orderItem.delete({ where: { id } });
        res.status(200).json({ message: "Order item deleted", item: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting order item", error: err.message });
    }
}

module.exports = { getOrderItems, postOrderItem, updateOrderItem, deleteOrderItem };
