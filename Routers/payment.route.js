const express = require('express');
const { stripPaymentIntent } = require('../Controller/payment.controller');
const Router = express.Router()

Router.post('/create-payment-intent', stripPaymentIntent)

module.exports = Router