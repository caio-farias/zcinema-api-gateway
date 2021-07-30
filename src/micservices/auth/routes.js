const express = require('express')
const routes = express.Router()
const AuthMiddleware = require('../auth/AuthMiddleware')
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')

routes.post(
  '/api/auth',
  [
    ApiGatewayMiddleware.verifyRequest, 
    AuthMiddleware.getUser,
  ],
  ApiGatewayController.passFoward
)

routes.post(
  '/api/auth/permission',
  [
    ApiGatewayMiddleware.verifyRequest, 
    ApiGatewayMiddleware.verifyTokenExistence,
  ],
  ApiGatewayController.passFoward
)

module.exports = routes