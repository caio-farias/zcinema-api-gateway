const axios = require('axios')
const { getMicServiceURL } = require('../utils')

module.exports = {
  async passFoward (req, res){
    const { micserviceName, reqPath } = req
    const micserviceUrl = getMicServiceURL(micserviceName) + 
      `/${reqPath != undefined ? reqPath : ''}`

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
}

