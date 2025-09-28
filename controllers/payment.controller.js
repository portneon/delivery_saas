const prisma = require('../lib/prisma');

async function getPayments(req, res) {
    try {
        const data = await prisma.payment.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching payments", error: err.message });
    }
}

async function getPaymentById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.payment.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Payment ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching payment", error: err.message });
    }
}

async function postPayment(req, res) {
    const { orderId, amount, method, status } = req.body;
    try {
        const data = await prisma.payment.create({ data: { orderId, amount, method, status } });
        res.status(201).json({ message: "Payment created", payment: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating payment", error: err.message });
    }
}

async function updatePaymentStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const data = await prisma.payment.update({ where: { id }, data: { status } });
        res.status(202).json({ message: "Payment status updated", payment: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating payment", error: err.message });
    }
}

module.exports = { getPayments, getPaymentById, postPayment, updatePaymentStatus };
