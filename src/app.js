const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const swaggerSetup = require('./swagger'); 

const app = express();

app.use(cors());
app.use(express.json());

swaggerSetup(app);

app.use('/api/v1/order', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('An error occurred');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Mock Order Service is running on the port: ${PORT}`);
});
