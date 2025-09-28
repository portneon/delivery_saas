const prisma = require('../lib/prisma');

async function getSubscriptionRuns(req, res) {
    try {
        const data = await prisma.subscriptionRun.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subscription runs", error: err.message });
    }
}

async function getSubscriptionRunById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.subscriptionRun.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Subscription run ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subscription run", error: err.message });
    }
}

async function getOrdersBySubscriptionRun(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.order.findMany({ where: { subscriptionRunId: id } });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders for subscription run", error: err.message });
    }
}

async function generateSubscriptionRunsToday(req, res) {
    try {
        const today = new Date();
        // Example: create runs for all active subscriptions today
        const subscriptions = await prisma.subscription.findMany({ where: { status: 'ACTIVE' } });
        const runs = [];
        for (const sub of subscriptions) {
            const run = await prisma.subscriptionRun.create({
                data: { subscriptionId: sub.id, runDate: today, status: 'PENDING' }
            });
            runs.push(run);
        }
        res.status(201).json({ message: "Subscription runs generated", runs });
    } catch (err) {
        res.status(500).json({ message: "Error generating subscription runs", error: err.message });
    }
}

module.exports = { getSubscriptionRuns, getSubscriptionRunById, getOrdersBySubscriptionRun, generateSubscriptionRunsToday };
