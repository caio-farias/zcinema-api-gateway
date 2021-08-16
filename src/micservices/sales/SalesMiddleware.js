const axiosBookings = require('./axiosBookings.js')
const axiosSales = require('./axiosSales.js')
const axiosReceipts = require('./axiosReceipts')

const createReceipt = async (req, res, booking) => {
  const { user_id, card_id } = req.params
  const { sale } = req.resData
  try {
    const resultSales = await axiosSales.get(`/cards/${user_id}/${card_id}`)
    const card = resultSales.data
    await axiosReceipts.post(`/${user_id}`, {
      user_id,
      sale_info: sale,
      card_info: card,
      booking_info: booking,
    })
    
    return res.json({ booking })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Ocorreu um erro, tente novamente" })
  }
}

module.exports = {
  async checkBooking (req, res, next){
    const { booking_id, user_id } = req.params
  
    if(booking_id == undefined)
      return res.status(400).json({ message: "Informe o bookind_id. " })
    
      if(user_id == undefined)
      return res.status(400).json({ message: "Informe o user_id. " })
  
    
    try {
      const result = await axiosBookings.get(`/${booking_id}`)
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
      const resultBookings = await axiosBookings.post(`/${booking_id}`)
      const booking = resultBookings.data
      return await createReceipt(req, res, booking)
    } catch (error) {
      console.log(error)
      if(error == undefined)
        return res.status(500).json({ message: "Ocorreu um erro neste microserviço." })
      const { message } = error.response.data
      return res.status(400).json({ 
        message : message || "Ocorreu um erro neste microsserviço, tente novamente."
      })
    }
  },
}

