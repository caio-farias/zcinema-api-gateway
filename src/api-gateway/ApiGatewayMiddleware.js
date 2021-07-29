const { micservices } = require('../registeredMicservices.json')
const { micServiceExists, isMethodSupported } = require('../utils')

module.exports = {
  verifyRequest(req, res, next){
    const { micserviceName } = req.params
    const method = req.method
    try {
      
      if(!micServiceExists(micserviceName))
        return res.status(404).json({ message: "Este microsserviço não existe."})

      if(!isMethodSupported(micserviceName, method))
        return res.status(404).json({ message: "Este microsserviço não suporta este método."})

      next()
    } catch (error) {
      return res.status(404).json({ message: "Requisição inváldia, tente novamente."})
    }
  }
}