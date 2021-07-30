module.exports = {
  setAvatar( req, res, next){
    const { micserviceName } = req.params
    const { method } = req
    
    if(method != 'POST' || micserviceName != 'users')
      next()
    
    const avatar = getServerURL() + '/uploads/' + req.file.filename
    req.body =  {...req.body, avatar}
    next()
  }
}