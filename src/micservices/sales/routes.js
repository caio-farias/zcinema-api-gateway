const express = require('express')
const routes = express.Router()
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')
const BookingMiddleware = require('../bookings/BookingMiddleware')

routes.post('/api/sales/users', ApiGatewayController.passFoward)
routes.patch('/api/sales/users/:id', ApiGatewayController.passFoward)
routes.delete('/api/sales/users/:id', ApiGatewayController.passFoward)

routes.post('/api/cards/:user_id', ApiGatewayController.passFoward)
routes.get('/api/cards/:user_id', ApiGatewayController.passFoward)

routes.post(
  '/api/sales/:card_id/:booking_id', 
  [BookingMiddleware, ApiGatewayController.passFoward]
)
routes.get('/api/sales/:card_id/', ApiGatewayController.passFoward)

module.exports = routes