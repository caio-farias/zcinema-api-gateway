const express = require('express')
const routes = express.Router()
const UserController = require('./micservices/users/UserController')
const AuthMiddleware = require('./micservices/auth/AuthMiddleware')
const ApiGatewayController = require('./api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('./api-gateway/ApiGatewayMiddleware')

routes.all(
  '/api/:micserviceName/:path?', 
  [
    ApiGatewayMiddleware.verifyRequest, 
    AuthMiddleware.verifyTokenExistence,
    AuthMiddleware.verifyTokenValue
  ], 
  ApiGatewayController
)

routes.get('/micservice/users/:email', UserController.getUser)


module.exports = routes