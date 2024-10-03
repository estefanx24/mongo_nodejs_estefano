const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Rutas
const transactionsRoutes = require('./routes/transactions');
const paymentMethodsRoutes = require('./routes/paymentMethods');  // Nueva ruta para Payment Methods
const invoicesRoutes = require('./routes/invoices');  // Nueva ruta para Invoices

app.use('/api/transactions', transactionsRoutes);
app.use('/api/payment_methods', paymentMethodsRoutes);  // Nueva ruta para Payment Methods
app.use('/api/invoices', invoicesRoutes);  // Nueva ruta para Invoices

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error(err));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
//go
