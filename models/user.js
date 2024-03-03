const {mongoose,Schema} = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required:true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  is_admin: Boolean
},{timestamps: true})

function validateRegister(user){
  const schema = new Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(50).email(),
    password: Joi.string().required().min(6)
  })
  return schema.validate(user)
}

function validateLogin(user){
  const schema = new Joi.object({
    email: Joi.string().required().min(3).max(50).email(),
    password: Joi.string().required().min(6)
  })
  return schema.validate(user)
}

userSchema.methods.createAuthToken = function() {
  const decoded_token = jwt.sign({
    _id: this._id,
    is_admin: this.is_admin
  },
  'jwtPrivateKey')
  console.log(decoded_token)
  return decoded_token
}
const User = mongoose.model('User',userSchema)

module.exports = {User,validateRegister,validateLogin}
