const axios = require('./axios')

module.exports = {
  async checkBooking (req, res, next){
    const { booking_id, user_id } = req.params
  
    if(booking_id == undefined)
      return res.status(400).json({ message: "Informe o bookind_id. " })
    
      if(user_id == undefined)
      return res.status(400).json({ message: "Informe o user_id. " })
  
    
    try {
      const result = await axios.get(`/${booking_id}`)
      const booking  = result.data

      if(!booking)
        return res.status(4009).json({ message: "Reserva não existe " })
      if(booking.user_id != user_id)
        return res.status(4009).json({ message: "Reserva não pertence a este usuário " })

      const price = booking.price
      const body = req.body
      req.body = {
        ...body,
        price
      }
      console.log(req.body)
      next()
      
    } catch (error) {
      // console.log(error)
      if(error == undefined)
        return res.status(500).json({ message: "Ocorreu um erro neste microserviço." })
      const { message } = error.response.data
      return res.status(400).json({ 
        message : message || "Ocorreu um erro neste microsserviço, tente novamente."
      })
    }
  },
  async confirmSale (req, res){
    const { booking_id } = req.params
    try {
      const result = await axios.post(`/${booking_id}`)
      const booking = result.data
      return res.json({ booking })
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
}
