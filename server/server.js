const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config')
const db = require('./models');

// middleware
app.use(express.json());
app.use(cors());

// Routes
const productsRoute = require('./routes/productRoute');
app.use('/api/products', productsRoute);
const usersRoute = require('./routes/userRoute');
app.use('/api/user', usersRoute);
const orderRoute = require('./routes/orderRoute')
app.use('/api/orders', orderRoute);


const PORT = process.env.PORT || 7000;
db.sequelize.sync().then(() => {
    app.listen(PORT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log(`Server is running on ${PORT}...`);
    })
})

