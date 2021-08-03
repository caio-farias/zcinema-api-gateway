const express = require('express')
const routes = express.Router()
const MoviesMiddleware = require('./MoviesMiddleware')
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')
const multer = require('multer')
const multerConfig = require('./config/multer')

routes.post(
  '/api/movies/', 
  [
    ApiGatewayMiddleware.verifyRequest,
    multer(multerConfig).single('file'),
    MoviesMiddleware.setBanner,
  ],
  ApiGatewayController.passFoward
)

routes.get(
  '/api/movies', 
  [
    ApiGatewayMiddleware.verifyRequest,
  ],
  ApiGatewayController.passFoward
)

routes.get(
  '/api/movies/:id', 
  [
    ApiGatewayMiddleware.verifyRequest,
  ],
  ApiGatewayController.passFoward
)

routes.patch(
  '/api/movies/:id', 
  [
    ApiGatewayMiddleware.verifyRequest,
  ],
  ApiGatewayController.passFoward
)

routes.delete(
  '/api/movies/:id', 
  [
    ApiGatewayMiddleware.verifyRequest,
  ],
  ApiGatewayController.passFoward
)

module.exports = routes