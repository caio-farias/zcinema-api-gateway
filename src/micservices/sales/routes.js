const express = require('express')
const routes = express.Router()
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')
const BookingMiddleware = require('../bookings/BookingMiddleware')

routes.post(
  '/api/sales/cards/:user_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayController.passFoward,
  ]
)

routes.get(
  '/api/sales/cards/:user_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayController.passFoward,
  ]
)

routes.post(
  '/api/sales/:card_id/:booking_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    BookingMiddleware, 
    ApiGatewayController.passFoward
  ]
)
routes.get(
  '/api/sales/:card_id/', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayController.passFoward,
  ]
)

module.exports = routes