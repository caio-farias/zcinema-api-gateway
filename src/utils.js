const { micservices } = require('./registeredMicservices.json')

const getMicServiceURL = (micserviceName) => {
  if(!micServiceExists(micserviceName))
    return

  const envVariableName = micservices.auth.url
  return process.env[envVariableName]
}

const micServiceExists = 
  (micserviceName) => Object.keys(micservices).includes(micserviceName)


const isMethodSupported = 
  (micserviceName, method) => micservices[micserviceName].methods.includes(method)

module.exports = {
  getMicServiceURL: getMicServiceURL,
  micServiceExists: micServiceExists,
  isMethodSupported: isMethodSupported,
}