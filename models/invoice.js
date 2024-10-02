const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoice_id: { type: String, required: true },
    transaction_id: { type: String, required: true },
    issue_date: { type: Date, default: Date.now },
    details: { type: String, required: true },
    user_id: { type: String, required: true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);

