const express = require('express')
const routes = express.Router()
const ApiGatewayController = require('../../api-gateway/ApiGatewayController')
const ApiGatewayMiddleware = require('../../api-gateway/ApiGatewayMiddleware')


// SESSIONS
routes.post(
  '/api/bookings/movies/:movie_id/sessions', 
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)
routes.get(
  '/api/bookings/sessions', 
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)
routes.patch(
  '/api/bookings/movies/:movie_id/sessions', 
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ], 
  ApiGatewayController.passFoward
)
routes.delete(
  '/api/bookings/movies/:movie_id/sessions', 
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
  ApiGatewayController.passFoward
)

// BOOKINGS
routes.post(
  '/api/bookings/:user_id/:session_id',
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
    ApiGatewayController.passFoward
)

routes.get(
  '/api/bookings',
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
    ApiGatewayController.passFoward
)
routes.get(
  '/api/bookings/:user_id/:session_id',
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
    ApiGatewayController.passFoward
)
routes.patch(
  '/api/bookings/:user_id/:session_id',
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
    ApiGatewayController.passFoward
)
routes.delete(
  '/api/bookings/:user_id/:session_id',
  [
    ApiGatewayMiddleware.verifyRequest,
    // ApiGatewayMiddleware.verifyTokenExistence,
    // ApiGatewayMiddleware.verifyTokenValue
  ],
    ApiGatewayController.passFoward
)

module.exports = routes