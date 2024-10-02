const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    payment_method_id: { type: String, required: true },
    user_id: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    last_four: { type: String, required: true },
    expiry_date: { type: Date, required: true }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
