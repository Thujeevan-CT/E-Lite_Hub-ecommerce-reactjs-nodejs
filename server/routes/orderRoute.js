const { v4: uuidv4 } = require('uuid')
const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_51JQUDwE8TBaYgLGpdn3ieJXP1Hs533llpAPD9AuJBehLRx9UaXj204UFOPxKEJXsoJnyRuEWRA8OKvwsiQNMdaO6008GLolB06");
const { orders } = require('../models')
const { orderItems } = require('../models')

router.post('/placeorder', async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body;

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })

    const payment = await stripe.charges.create({
        amount: subtotal * 100,
        currency: 'lkr',
        customer: customer.id,
        receipt_email: token.email
    }, {
        idempotencyKey: uuidv4()
    })

    if (payment) {

        const shippingAddressFull = `${token.card.address_line1}, ${token.card.address_city}, ${token.card.address_country}`;

        const ordersData = await orders.create({
            userid: currentUser.userid,
            name: currentUser.username,
            email: currentUser.email,
            shippingAddress: shippingAddressFull,
            orderAmount: subtotal,
            transactionId: payment.source.id,
            isDelivered: 'false',
        })

        for (let i = 0; i < cartItems.length; i++) {
            const ordersItems = await orderItems.create({
                userid: currentUser.userid,
                transactionId: payment.source.id,
                name: cartItems[i].name,
                productid: cartItems[i].productid,
                quantity: cartItems[i].quantity,
                price: cartItems[i].price,
            })
        }
        res.json(ordersData);
    } else {
        return res.status(400).json({ message: 'Payment Failed' });
    }

})

router.post('/getordersbyuserid', async (req, res) => {

    const userId = req.body.userid;
    const order = await orders.findAll({
        where: {
            userid: userId
        }
    });
    res.send(order);

})

router.post('/getorderbyid', async (req, res) => {

    const transactionID = req.body.orderid;
    const orderItemsData = await orderItems.findAll({
        where: {
            transactionId: transactionID
        }
    });

    const ordersData = await orders.findAll({
        where: {
            transactionId: transactionID
        }
    });

    let orderData = [];

    await orderData.push(ordersData);
    await orderData.push(orderItemsData);

    res.send(orderData);

})

router.get('/getallorders', async (req, res) => {
    const getAllOrders = await orders.findAll();
    res.send(getAllOrders);
})

module.exports = router