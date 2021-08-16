const express = require('express')
const routes = express.Router()
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')

routes.get(
  '/api/receipts/:user_id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayController.passFoward,
  ]
)

module.exports = routes