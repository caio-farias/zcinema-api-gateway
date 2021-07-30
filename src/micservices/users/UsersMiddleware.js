const { getServerURL } = require('../../utils')

module.exports = {
  setAvatar( req, res, next){
    const avatar = getServerURL() + '/uploads/user-avatars/' + req.file.filename
    req.body =  {...req.body, avatar}
    next()
  }
}