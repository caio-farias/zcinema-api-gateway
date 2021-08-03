const { getServerURL } = require('../../utils')

module.exports = {
  setAvatar( req, res, next){
    const avatar = getServerURL() + '/uploads/user-avatars/' 
    + (req.file.filename =! undefined ?  req.file.filename : 'placeholder.png')
    req.body =  {...req.body, avatar}
    next()
  }
}