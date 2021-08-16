const axiosInstance = require('axios')
const { secret } = require('../../micserviceSecret.json')
const { getMicServiceURL } = require('../../utils')

const baseURL = getMicServiceURL('bookings')
const axios = axiosInstance.create({ baseURL })

axios.interceptors.request.use(async config => {

  const headers = { ...config.headers }

  if (secret) {
    headers.Authorization = secret
  }

  return { ...config, headers }
})

module.exports = axios