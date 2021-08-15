const express = require('express')
const routes = express.Router()
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')
const SalesMiddleware = require('../sales/SalesMiddleware')


routes.get(
  '/api/sales/users/:user_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayController.passFoward,
  ]
)

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
  '/api/sales/credit/:card_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayController.passFoward
  ]
)

routes.post(
  '/api/sales/:user_id/:card_id/:booking_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    SalesMiddleware.checkBooking, 
    ApiGatewayController.passFowardAsMiddleware,
    SalesMiddleware.confirmSale
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