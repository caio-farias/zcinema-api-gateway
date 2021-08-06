const axios = require('axios').create()
const { getMicServiceURL, isRedundancyMethod, shouldApplyRedundancy } = require('../utils')
const { stringify } = require('querystring')
const { secret } = require('../micserviceSecret.json')
const axiosRetry = require('axios-retry')

const applyRedundancy = async (micserviceName, redundancyService, redundancyId, req, res) => {
  const { reqPath } = req
  const micserviceUrl = getMicServiceURL(redundancyService)
    + `${reqPath != undefined ? `/${micserviceName}/` + reqPath : `/${micserviceName}`}`
  const query =  Object.keys(req.query).length > 0 ? ('?' + stringify(req.query)) : ''

  try {

    req.body.id = redundancyId
    if(micserviceName == 'users'){
      delete req.body.password
      delete req.body.avatar
    } else if(micserviceName == 'movies'){
      delete req.body.banner
      delete req.body.trailer
    }

    axiosRetry(axios, {
      retries: 3,
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000;
      },
      retryCondition: (error) => {
        return error.response.status === 503;
      },
    })
    
    await axios({
      method: req.method,
      url: micserviceUrl + query,
      headers: {
        'Authorization': secret,
        'Content-Type': 'application/json',
      },
      data: req.body,
      timeout: 5000,
    })

  } catch (error) {
    const { message } = error.response.data || undefined
    return res.status(400).json({ 
      message : message || "Ocorreu um erro neste microsserviço, tente novamente."
    })
  }
}

const  testEndpoints = async(micserviceName, req, res) => {
  const hosts = [getMicServiceURL(micserviceName)]
  if(
    isRedundancyMethod('bookings', req.method) &&
    shouldApplyRedundancy('bookings', micserviceName)
    )
      hosts.push(getMicServiceURL('bookings'))
  try {
    for(let host of hosts){
      let res = await axios.get(host, { timeout: 5000 });
    }    
  } catch (error) {
    console.log('VERFYING >> ', error) 
  }
}

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

    await axios({
      method: req.method,
      url: micserviceUrl + query,
      headers: {
        'Authorization': secret,
        'Content-Type': 'application/json',
      },
      data: req.body,
      timeout: 2,
    })

  } catch (error) {
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
    const query =  Object.keys(req.query).length > 0  ? ('?' + stringify(req.query)) : ''
    
    
    try {
      await testEndpoints(micserviceName, req, res)
      
      const micserviceResponse = await axios({
        method: req.method,
        url: micserviceUrl + query,
        headers: {
          'Authorization': secret,
          'Content-Type': 'application/json',
        },
        data: req.body,
        timeout: 5000,
      })

      if(micserviceResponse.data == undefined)
        return res.status(503).json({ message: "Heroku botou API Gateway para dormir"})

      const body = micserviceResponse.data
      if(
        isRedundancyMethod('bookings', req.method) &&
        shouldApplyRedundancy('bookings', micserviceName)
        ){
          await applyRedundancy(micserviceName, 'bookings', body.id, req, res)
      }

      return res.json({ ...body })
    } catch (error) {
      console.log(error)
      if(error.response == undefined)
        return res.status(400).json({ 
          message: "Ocorreu um erro neste microsserviço, tente novamente." 
        })

      const { message } = error.response.data || undefined
      return res.status(400).json({ 
        message : message || "Ocorreu um erro neste microsserviço, tente novamente."
      })
    }
  },
}

