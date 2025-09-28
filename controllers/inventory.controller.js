const prisma = require('../lib/prisma');

async function getInventoryBatches(req, res) {
    const { productId } = req.params;
    try {
        const data = await prisma.inventoryBatch.findMany({ where: { productId } });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching inventory batches", error: err.message });
    }
}

async function getInventoryBatchById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.inventoryBatch.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Inventory batch ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching inventory batch", error: err.message });
    }
}

async function postInventoryBatch(req, res) {
    const { productId } = req.params;
    const { batchNumber, quantity, expiryDate } = req.body;
    try {
        const data = await prisma.inventoryBatch.create({ data: { productId, batchNumber, quantity, expiryDate } });
        res.status(201).json({ message: "Inventory batch created", batch: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating inventory batch", error: err.message });
    }
}

async function updateInventoryBatch(req, res) {
    const { id } = req.params;
    const { batchNumber, quantity, expiryDate } = req.body;
    try {
        const data = await prisma.inventoryBatch.update({ where: { id }, data: { batchNumber, quantity, expiryDate } });
        res.status(202).json({ message: "Inventory batch updated", batch: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating inventory batch", error: err.message });
    }
}

async function deleteInventoryBatch(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.inventoryBatch.delete({ where: { id } });
        res.status(200).json({ message: "Inventory batch deleted", batch: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting inventory batch", error: err.message });
    }
}

module.exports = { getInventoryBatches, getInventoryBatchById, postInventoryBatch, updateInventoryBatch, deleteInventoryBatch };
