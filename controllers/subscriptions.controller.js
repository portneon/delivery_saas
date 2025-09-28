const prisma = require('../lib/prisma');

async function getSubscriptions(req, res) {
    try {
        const data = await prisma.subscription.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subscriptions", error: err.message });
    }
}

async function getSubscriptionById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.subscription.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Subscription ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subscription", error: err.message });
    }
}

async function postSubscription(req, res) {
    const { customerId, tenantId, startDate, endDate, frequency, status } = req.body;
    try {
        const data = await prisma.subscription.create({ data: { customerId, tenantId, startDate, endDate, frequency, status } });
        res.status(201).json({ message: "Subscription created", subscription: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating subscription", error: err.message });
    }
}

async function updateSubscription(req, res) {
    const { id } = req.params;
    const { startDate, endDate, frequency, status } = req.body;
    try {
        const data = await prisma.subscription.update({ where: { id }, data: { startDate, endDate, frequency, status } });
        res.status(202).json({ message: "Subscription updated", subscription: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating subscription", error: err.message });
    }
}

async function deleteSubscription(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.subscription.delete({ where: { id } });
        res.status(200).json({ message: "Subscription deleted", subscription: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting subscription", error: err.message });
    }
}

module.exports = { getSubscriptions, getSubscriptionById, postSubscription, updateSubscription, deleteSubscription };
