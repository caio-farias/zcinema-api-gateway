const axiosInstance = require('axios')
const { secret } = require('../micserviceSecret.json')
const { getMicServiceURL } = require('../utils')
const axiosRetry = require('axios-retry')

const baseURL = getMicServiceURL('auth')
const axios = axiosInstance.create({ baseURL })

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

axios.interceptors.request.use(async config => {

  const headers = { ...config.headers }

  if (secret) {
    headers.Authorization = secret
  }

  return { ...config, headers }
})


module.exports = axios