const { getServerURL } = require('../../utils')

module.exports = {
  setAvatar( req, res, next){
    console.log(req.file)
    const avatar = getServerURL() + '/uploads/' + req.file.filename
    req.body =  {...req.body, avatar}
    next()
  }
}