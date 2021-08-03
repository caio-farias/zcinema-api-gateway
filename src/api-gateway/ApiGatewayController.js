const axios = require('axios')
const { getMicServiceURL, isRedundancyMethod, shouldApplyRedundancy } = require('../utils')
const { stringify } = require('querystring')
const { secret } = require('../micserviceSecret.json')

const applyRedundancy = async (micserviceName, redundancyService, req, res) => {
  const { reqPath } = req
  const micserviceUrl = getMicServiceURL(redundancyService)
    + `${reqPath != undefined ? `/${micserviceName}/` + reqPath : `/${micserviceName}`}`
  const query =  Object.keys(req.query).length > 0 ? ('?' + stringify(req.query)) : ''
  try {

    if(micserviceName == 'users'){
      delete req.body.password
      delete req.body.avatar
    } else if(micserviceName == 'movies'){
      delete req.body.banner
      delete req.body.trailer
    }
    console.log(micserviceUrl)
    const micserviceResponse = await axios({
      method: req.method,
      url: micserviceUrl + query,
      headers: {
        'Authorization': secret,
        'Content-Type': 'application/json',
      },
      data: req.body,
      timeout: 3000,
    })
    const body = micserviceResponse.data
    console.log(body) 
  } catch (error) {
    console.log(error)
    const { message } = error.response.data || undefined
    return res.status(400).json({ 
      message : message || "Ocorreu um erro neste microsserviço, tente novamente."
    })
  }
}

module.exports = {
  async passFoward (req, res){
    const { micserviceName, reqPath } = req
    const micserviceUrl = getMicServiceURL(micserviceName) 
     + `${reqPath != undefined ? '/' + reqPath : ''}`
    console.log(reqPath)
    const query =  Object.keys(req.query).length > 0  ? ('?' + stringify(req.query)) : ''
    
    try {
      const micserviceResponse = await axios({
        method: req.method,
        url: micserviceUrl + query,
        headers: {
          'Authorization': secret,
          'Content-Type': 'application/json',
        },
        data: req.body,
        timeout: 3000,
        rejectUnauthorized: false
      })
      
      const body = micserviceResponse.data

      if( 
        isRedundancyMethod('bookings', req.method) &&
        shouldApplyRedundancy('bookings', micserviceName)
        ){
          await applyRedundancy(micserviceName, 'bookings', req, res)
      }

      return res.json({ ...body })
    } catch (error) {
      // console.log(error)
      const { message } = error.response.data || undefined
      return res.status(400).json({ 
        message : message || "Ocorreu um erro neste microsserviço, tente novamente."
      })
    }
  },
}

