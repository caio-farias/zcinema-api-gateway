const AuthController = require("../micservices/auth/AuthMiddleware");
const UserController = require("../micservices/users/UserController");
const { micservices } = require('../registeredMicservices.json')
const axios = require('axios')

module.exports = async (req, res) => {
  const { micserviceName, path } = req.params
  const envVariableName = micservices[micserviceName].url
  const micserviceUrl = process.env[envVariableName] 
    + `/${micserviceName}` 
    + `/${path != undefined ? path : ''}`

  try {
    const micserviceResponse = await axios({
      method: req.method,
      url: micserviceUrl,
      headers: {
        'Authorization': !!req.headers.authorization? req.headers.authorization: '',
        'Content-Type': 'application/json',
      },
      data: req.body,
      timeout: 3000,
      rejectUnauthorized: false
    })
    const body = micserviceResponse.data
    return res.json({ ...body })
  } catch (error) {
    const { message } = error.response.data
    return res.status(400).json({ 
      message : message || "Ocorreu um erro neste microsserviço, tente novamente."
    })
  }

}