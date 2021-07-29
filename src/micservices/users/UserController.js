const axios = require('axios')
const { getMicServiceURL } = require('../../utils')
const { secret } = require('../../micserviceSecret.json')

axios.interceptors.request.use(async config => {

  const headers = { ...config.headers }

  if (secret) {
    headers.Authorization = secret
  }

  return { ...config, headers }
})

module.exports = {
  async getUser(req, res){
    const { email } = req.params
    const micserviceUrl = getMicServiceURL('users')

    try {
      const result = await axios.post(
        micserviceUrl + '/microsservice-users/',
        { email },
        {  }
      )
      const { user } = result.data

      return res.json({ user })
    } catch (error) {
      const { message } = error.response.data
      return res.status(400).json({ 
        message : message || "Ocorreu um erro neste microsserviço, tente novamente."
      })
    }
  }
}