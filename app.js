const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Rutas
const transactionsRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionsRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
