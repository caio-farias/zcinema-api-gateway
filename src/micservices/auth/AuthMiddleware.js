const axios = require('axios')
const { getMicServiceURL } = require('../../utils')

module.exports = {
  async verifyTokenExistence(req, res, next){
    const authHeader = req.headers.authorization
    const { micserviceName } = req.params
    const method = req.method
  
    if(micserviceName == 'users' && method == 'POST')
      return next()
    
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
    const { micserviceName } = req.params
    const method = req.method
    const { id } = req.params
    const token = req.token
    const micserviceUrl = getMicServiceURL('auth')

    if(micserviceName == 'users' && method == 'POST')
      return next()

    try {
      const result = await axios.post(micserviceUrl + '/permission', { token, id })
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