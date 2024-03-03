const logger = require('../startup/logger')
module.exports = (err,req,res,next) => {
  logger.log("error",err.message)
  res.status(500).send('Hata oluştu')
}