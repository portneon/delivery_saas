const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require("dotenv").config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
const tenantRoutes = require('./routes/tenants.routes')
const userRoutes = require('./routes/user.routes');
const customerRoutes = require('./routes/customers.routes');
const addressRoutes = require('./routes/address.routes');
const productRoutes = require('./routes/product.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const subscriptionRoutes = require('./routes/subscriptions.routes');
const subscriptionRunRoutes = require('./routes/subscriptionrun.routes');
const orderRoutes = require('./routes/orders.routes');
const orderItemRoutes = require('./routes/orderitem.routes');
const paymentRoutes = require('./routes/payment.routes');

app.use('/tenants',tenantRoutes)
app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/addresses', addressRoutes);
app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/subscription-runs', subscriptionRunRoutes);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/payments', paymentRoutes);



app.listen('3000', () => {
    console.log('server is live on 3000')
})