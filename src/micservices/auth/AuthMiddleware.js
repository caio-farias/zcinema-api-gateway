const axios = require('./axios')

module.exports = {
  async getUser(req, res, next){
    const { email, password } = req.body
    try {
      const result = await axios.post(
        '/with-password/',
        { email },
      )
      const { user } = result.data
      req.body = { user, passwordTry: password }
      next()
    } catch (error) {
      const { message } = error.response.data
      return res.status(400).json({ 
        message : message || "Ocorreu um erro neste microsserviço, tente novamente."
      })
    }
  }
}