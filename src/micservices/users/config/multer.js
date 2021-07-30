const multer = require('multer')
const path = require('path')
const { randomBytes } = require('crypto')
const allowedMimes = [
  'image/jpeg',
  'image/jpg',
  'image/png'
]

module.exports =  {
  dest: path.resolve(__dirname,'..', '..' ,
    '..', '..', 'tmp', 'uploads', 'user-avatars'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 
        '..', '..', 'tmp', 'uploads', 'user-avatars'))
    },
    filename: (req, file, callback) => {
     randomBytes(16, (err, hash) =>{
        if(err)
          callback(err)
        
        const fileName = `${Date.now()}${hash.toString('hex')}${file.originalname}`
        callback(null, fileName)
      })
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if(allowedMimes.includes(file.mimetype)){
      callback(null, true)
    }else {
      callback(new Error("Tipo de arquivo inválido"))
    }
  }
}