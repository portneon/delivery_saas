const prisma = require('../lib/prisma');

async function getProducts(req, res) {
    try {
        const data = await prisma.product.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
}

async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.product.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Product ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching product", error: err.message });
    }
}

async function postProduct(req, res) {
    const { tenantId, name, type, unit, price } = req.body;
    try {
        const data = await prisma.product.create({ data: { tenantId, name, type, unit, price } });
        res.status(201).json({ message: "Product created", product: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, type, unit, price } = req.body;
    try {
        const data = await prisma.product.update({ where: { id }, data: { name, type, unit, price } });
        res.status(202).json({ message: "Product updated", product: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating product", error: err.message });
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: "Product deleted", product: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting product", error: err.message });
    }
}

module.exports = { getProducts, getProductById, postProduct, updateProduct, deleteProduct };
