/*
    This folder contains all the routes related to Tenants 
    @author Shashwat Sharma
*/
const prisma = require('../lib/prisma')


async function getTenants(req, res) {
    try {
        const data = await prisma.tenant.findMany()
        res.status(200).json(data)    
    } catch (err) {
        res.status(500).json({ error: 'Error while fetching tenants', details: err.message })
    }
}


async function getTenantById(req, res) {
    try {
        const { id } = req.params
        const tenant = await prisma.tenant.findUnique({
            where: { id }
        })

        if (!tenant) {
            return res.status(404).json({ error: 'Tenant not found' })
        }

        res.status(200).json(tenant)
    } catch (err) {
        res.status(500).json({ error: 'Error while fetching tenant', details: err.message })
    }
}

async function postTenant(req, res) {
    try {
        const { name, address } = req.body 
        const tenant = await prisma.tenant.create({
            data: { name, address }
        })
        res.status(201).json(tenant)
    } catch (err) {
        res.status(400).json({ error: 'Error while creating tenant', details: err.message })
    }
}


async function updateTenant(req, res) {
    try {
        const { id } = req.params
        const { name, address } = req.body

        const tenant = await prisma.tenant.update({
            where: { id },
            data: { name, address }
        })
        res.status(200).json(tenant)
    } catch (err) {
        res.status(400).json({ error: 'Error while updating tenant', details: err.message })
    }
}


async function deleteTenant(req, res) {
    try {
        const { id } = req.params
        await prisma.tenant.delete({
            where: { id }
        })
        res.status(200).json({ message: 'Tenant deleted successfully' })
    } catch (err) {
        res.status(400).json({ error: 'Error while deleting tenant', details: err.message })
    }
}

module.exports = {
    getTenants,
    getTenantById,
    postTenant,
    updateTenant,
    deleteTenant
}
