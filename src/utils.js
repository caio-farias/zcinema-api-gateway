const { micservices } = require('./registeredMicservices.json')
require('dotenv/config')

const getMicServiceURL = (micserviceName) => {
  if(!micServiceExists(micserviceName))
    return

  const envVariableName = micservices[micserviceName].url
  return process.env[envVariableName] + `/${micserviceName}`
}

const micServiceExists = 
  (micserviceName) => Object.keys(micservices).includes(micserviceName)

const isMethodSupported = 
  (micserviceName, method) => micservices[micserviceName].methods.includes(method)

const shouldApplyRedundancy = 
  (redudancyService, micserviceName) => 
    micservices[redudancyService].redundancy.includes(micserviceName)

const isRedundancyMethod = 
  (micserviceName, method) => 
    micservices[micserviceName]['redundancy_methods'].includes(method)

const isDevEnviroment = () =>
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined
  
const getServerURL = () => {
    const isDev = isDevEnviroment()
    return isDev ? `http://${process.env.HOST}:${process.env.PORT}`
      : `https://${process.env.HOST}`
}

module.exports = {
  getMicServiceURL: getMicServiceURL,
  micServiceExists: micServiceExists,
  isMethodSupported: isMethodSupported,
  isRedundancyMethod: isRedundancyMethod,
  shouldApplyRedundancy: shouldApplyRedundancy,
  isDevEnviroment: isDevEnviroment,
  getServerURL: getServerURL
}
