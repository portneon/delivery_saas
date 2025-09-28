const prisma = require('../lib/prisma');

async function getOrders(req, res) {
    try {
        const data = await prisma.order.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
}

async function getOrderById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.order.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Order ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching order", error: err.message });
    }
}

async function postOrder(req, res) {
    const { subscriptionRunId, customerId, tenantId, totalAmount, status } = req.body;
    try {
        const data = await prisma.order.create({
            data: { subscriptionRunId, customerId, tenantId, totalAmount, status }
        });
        res.status(201).json({ message: "Order created", order: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err.message });
    }
}

async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const data = await prisma.order.update({
            where: { id },
            data: { status }
        });
        res.status(202).json({ message: "Order updated", order: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating order", error: err.message });
    }
}

async function deleteOrder(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.order.delete({ where: { id } });
        res.status(200).json({ message: "Order deleted", order: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting order", error: err.message });
    }
}

module.exports = { getOrders, getOrderById, postOrder, updateOrderStatus, deleteOrder };
