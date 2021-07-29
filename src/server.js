const express = require('express')
const helmet = require('helmet')
const corsMiddleware = require('./cors')
const routes = require('./routes')
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

app.use(routes)
app.listen(process.env.PORT || 3333)