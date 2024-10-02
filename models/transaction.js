const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true },
    user_id: { type: String, required: true },
    ride_id: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);

