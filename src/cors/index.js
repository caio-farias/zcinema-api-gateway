const cors = require('cors')

const coresOpt = {
  origin: "*",
  optionsSuccessStatus: 200
}

module.exports = cors(coresOpt)