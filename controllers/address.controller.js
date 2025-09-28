const prisma = require('../lib/prisma');

async function getAddresses(req, res) {
    try {
        const data = await prisma.address.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching addresses", error: err.message });
    }
}

async function getAddressById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.address.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `Address ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching address", error: err.message });
    }
}

async function postAddress(req, res) {
    const { customerId, addressLine, city, state, pincode } = req.body;
    try {
        const data = await prisma.address.create({ data: { customerId, addressLine, city, state, pincode } });
        res.status(201).json({ message: "Address created", address: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating address", error: err.message });
    }
}

async function updateAddress(req, res) {
    const { id } = req.params;
    const { addressLine, city, state, pincode } = req.body;
    try {
        const data = await prisma.address.update({ where: { id }, data: { addressLine, city, state, pincode } });
        res.status(202).json({ message: "Address updated", address: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating address", error: err.message });
    }
}

async function deleteAddress(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.address.delete({ where: { id } });
        res.status(200).json({ message: "Address deleted", address: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting address", error: err.message });
    }
}

module.exports = { getAddresses, getAddressById, postAddress, updateAddress, deleteAddress };
