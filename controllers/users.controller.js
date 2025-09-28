const prisma = require('../lib/prisma');

async function getUser(req, res) {
    try {
        const data = await prisma.user.findMany();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.user.findUnique({ where: { id } });
        if (!data) return res.status(404).json({ message: `User ${id} not found` });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err.message });
    }
}

async function PostUser(req, res) {
    const { tenantId, name, email, password, role } = req.body;
    try {
        const data = await prisma.user.create({
            data: {
                tenantId, name, email, password, role
            }
        });
        res.status(201).json({ message: "User created", user: data });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
}

async function UpdateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    try {
        const data = await prisma.user.update({
            where: {
                id
            },
            data: {
                name, email, password, role
            }
        });
        res.status(202).json({ message: "User updated", user: data });
    } catch (err) {
        res.status(404).json({ message: "Error updating user", error: err.message });
    }
}

async function DeleteUser(req, res) {
    const { id } = req.params;
    try {
        const data = await prisma.user.delete({
            where: {
                id
            }
        });
        res.status(200).json({ message: "User deleted", user: data });
    } catch (err) {
        res.status(404).json({ message: "Error deleting user", error: err.message });
    }
}

module.exports = { getUser, getUserById, PostUser, UpdateUser, DeleteUser };
