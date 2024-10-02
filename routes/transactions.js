const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Obtener todas las transacciones
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva transacción (POST)
router.post('/', async (req, res) => {
    const transaction = new Transaction({
      transaction_id: req.body.transaction_id,
      user_id: req.body.user_id,
      ride_id: req.body.ride_id,
      amount: req.body.amount,
      payment_method: req.body.payment_method,
      status: req.body.status
    });
  
    try {
      const newTransaction = await transaction.save();
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = router;

// Obtener una transacción específica
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar una transacción
router.patch('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });

        if (req.body.status != null) {
            transaction.status = req.body.status;
        }

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una transacción por ID
router.delete('/:id', async (req, res) => {
    try {
      const transaction = await Transaction.findByIdAndDelete(req.params.id);
      if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });
      res.json({ message: 'Transacción eliminada' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
