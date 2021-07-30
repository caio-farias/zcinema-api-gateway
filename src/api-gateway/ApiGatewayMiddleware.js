const { micServiceExists, isMethodSupported } = require('../utils')
const axios = require('./axios')

module.exports = {
  verifyRequest(req, res, next){
    const url = req.path.split('/')
    const [ micserviceName ] = url.slice(2,3)
    const [ reqPath ]  =  url.slice(3, url.length)
    req.micserviceName = micserviceName
    req.reqPath = reqPath
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
  },
  async verifyTokenExistence(req, res, next){
    const authHeader = req.headers.authorization
  
    if(!authHeader)
      return res.status(401).send({ message: "Token não informado."})
    
    const parts = authHeader.split(' ')
  
    if(!parts.length == 2)
      return res.status(401).send({ message: "Token incompleto." })
  
    const [ scheme, token ] = parts
  
    if(!/^Bearer$/i.test(scheme))
      return res.status(401).send({ message: "Token mal formatado."})
    
    req.token = token
    next()
  },
  async verifyTokenValue(req, res, next){
    const { id } = req.params
    const token = req.token

    try {
      const result = await axios.post('/permission', { token, id })
      const { permission } = result.data
      
      if(permission == 'DENIED')
        return res.status(401).json({ 
          message: "Sem permissão para realizar esta requisição." 
        })
        
      next()
    } catch (error) {
        return res.status(400).json({ message: "Falha na requisição, tente novamente." })
    }
  },
}