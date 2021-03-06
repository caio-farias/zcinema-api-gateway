const express = require('express')
const helmet = require('helmet')
const corsMiddleware = require('./cors')
const userRoutes = require('./micservices/users/routes')
const authRoutes = require('./micservices/auth/routes')
const moviesRoutes = require('./micservices/movies/routes')
const bookingsRoutes = require('./micservices/bookings/routes')
const salesRoutes = require('./micservices/sales/routes')
const receiptsRoutes = require('./micservices/receipts/routes')


require('dotenv/config')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(corsMiddleware)
app.use('*', corsMiddleware)

app.use((req, res, next) =>{
  console.log(`>> ${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}`)
  next()
})

app.use(userRoutes)
app.use(authRoutes)
app.use(moviesRoutes)
app.use(bookingsRoutes)
app.use(salesRoutes)
app.use(receiptsRoutes)

app.use(express.static('tmp'))
app.listen(process.env.PORT || 3333)