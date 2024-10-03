const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

// Obtener todas las facturas
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva factura (POST)
router.post('/', async (req, res) => {
    const invoice = new Invoice({
        invoice_id: req.body.invoice_id,
        transaction_id: req.body.transaction_id,
        issue_date: req.body.issue_date,
        details: req.body.details,
        user_id: req.body.user_id
    });

    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener una factura específica
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar una factura (PATCH)
router.patch('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });

        if (req.body.details != null) {
            invoice.details = req.body.details;
        }

        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una factura (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
        res.json({ message: 'Factura eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
