const prisma = require('../lib/prisma');

async function getCustomers(req, res) {
    try {
        const data = await prisma.customer.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: "Error while fetching customers",
            error: err.message
        });
    }
}

async function getCustomerById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.customer.findUnique({
            where: { id },
        });
        if (!data) {
            return res.status(404).json({ message: `Customer with id ${id} not found` });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: "Error while fetching customer by id",
            error: err.message
        });
    }
}

async function PostCustomer(req, res) {
    const { tenantId, name, email, phone } = req.body;
    try {
        const data = await prisma.customer.create({
            data: { tenantId, name, email, phone }
        });
        res.status(201).json({ message: "Customer created successfully", customer: data });
    } catch (err) {
        res.status(500).json({
            message: "Error while creating customer",
            error: err.message
        });
    }
}

async function UpdateCustomer(req, res) {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const data = await prisma.customer.update({
            where: { id },
            data: { name, email, phone }
        });
        res.status(202).json({ message: "Customer updated successfully", customer: data });
    } catch (err) {
        res.status(404).json({
            message: `Error updating customer with id ${id}`,
            error: err.message
        });
    }
}

async function deleteCustomer(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.customer.delete({
            where: { id }
        });
        res.status(200).json({ message: `Customer with id ${id} deleted successfully`, customer: data });
    } catch (err) {
        res.status(404).json({
            message: `Error deleting customer with id ${id}`,
            error: err.message
        });
    }
}

module.exports = { getCustomers, getCustomerById, PostCustomer, UpdateCustomer, deleteCustomer };
