const express = require('express');
const router = express.Router();
const PaymentMethod = require('../models/paymentMethod');

// Obtener todos los métodos de pago
router.get('/', async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.json(paymentMethods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo método de pago (POST)
router.post('/', async (req, res) => {
    const paymentMethod = new PaymentMethod({
        payment_method_id: req.body.payment_method_id,
        user_id: req.body.user_id,
        type: req.body.type,
        provider: req.body.provider,
        last_four: req.body.last_four,
        expiry_date: req.body.expiry_date
    });

    try {
        const newPaymentMethod = await paymentMethod.save();
        res.status(201).json(newPaymentMethod);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener un método de pago específico
router.get('/:id', async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) return res.status(404).json({ message: 'Método de pago no encontrado' });
        res.json(paymentMethod);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un método de pago (PATCH)
router.patch('/:id', async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) return res.status(404).json({ message: 'Método de pago no encontrado' });

        if (req.body.expiry_date != null) {
            paymentMethod.expiry_date = req.body.expiry_date;
        }

        const updatedPaymentMethod = await paymentMethod.save();
        res.json(updatedPaymentMethod);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un método de pago (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        if (!paymentMethod) return res.status(404).json({ message: 'Método de pago no encontrado' });
        res.json({ message: 'Método de pago eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
