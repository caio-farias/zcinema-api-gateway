const axios = require('./axios')

module.exports = async (req, res, next) => {
  const { booking_id, user_id, card_id } = req.params

  if(booking_id == undefined)
    return res.status(400).json({ message: "Informe o bookind_id. " })
  
    if(user_id == undefined)
    return res.status(400).json({ message: "Informe o user_id. " })

  
  try {
    const result = await axios.get(`/${user_id}/${booking_id}`)
    const booking  = result.data
    if(!booking)
      return res.status(4009).json({ message: "Sessão não existe " })

    next()
    
  } catch (error) {
    console.log(error)
    if(error == undefined)
      return res.status(500).json({ message: "Ocorreu um erro neste microserviço." })
    const { message } = error.response.data
    return res.status(400).json({ 
      message : message || "Ocorreu um erro neste microsserviço, tente novamente."
    })
  }
}