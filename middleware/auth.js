const config = require('config')
const jwt = require('jsonwebtoken')

module.exports =function (req,res, next){
  const token = req.header('x-auth-token')
  if(!token){
    return res.status(401).send('yetkiniz yok')
  }
  try {
    const decodedToken = jwt.verify(token,config.get('jwtPrivateKey'))
    req.user = decodedToken
    next()
  } catch (ex) {
    return res.status(400).send('hatalı token')
  }
}