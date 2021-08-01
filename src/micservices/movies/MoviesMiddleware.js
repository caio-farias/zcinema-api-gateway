const { getServerURL } = require('../../utils')

module.exports = {
  setBanner( req, res, next){
    const banner = getServerURL() + '/uploads/movie-banners/' + req.file.filename
    req.body =  {...req.body, banner}
    next()
  }
}