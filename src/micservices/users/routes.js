const express = require('express')
const routes = express.Router()
const UsersMiddleware = require('./UsersMiddleware')
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')
const multer = require('multer')
const multerConfig = require('./config/multer')

routes.post(
  '/api/users/', 
  [
    ApiGatewayMiddleware.verifyRequest,
    UsersMiddleware.setAvatar,
    multer(multerConfig).single('file'),
  ],
  ApiGatewayController.passFoward
)

routes.get(
  '/api-gateway/users/with-password', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayMiddleware.verifyTokenExistence,  
    ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)

routes.get(
  '/api/users/', 
  [
    ApiGatewayMiddleware.verifyRequest,
  ],
  ApiGatewayController.passFoward
)

routes.get(
  '/api/users/:id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayMiddleware.verifyTokenExistence,  
    ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)

routes.patch(
  '/api/users/:id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayMiddleware.verifyTokenExistence,  
    ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)

routes.delete(
  '/api/users/:id', 
  [
    ApiGatewayMiddleware.verifyRequest,
    ApiGatewayMiddleware.verifyTokenExistence,  
    ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)

module.exports = routes