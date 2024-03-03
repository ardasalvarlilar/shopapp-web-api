const express = require('express')
const router = express.Router()
const {User,validateLogin,validateRegister} = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/',async (req,res) => {
  res.send()
})
router.post('/',async (req,res) => {
  const { error } = validateRegister(req.body)
  if(error){
    res.status(400).send(error.details[0].message)
  }
  var user = await User.findOne({email: req.body.email})
  if(user){
    return res.status(400).send('bu mail adresiyle bir kullanıcı zaten mevcut.')
  }
  const hashed_password = await bcrypt.hash(req.body.password,10)
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed_password
  })
  await user.save()
  const token = user.createAuthToken()
  res.header("x-auth-token",token).send(user)
})

router.post('/auth',async(req,res) => {
  const {error} = validateLogin(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }
  var user = await User.findOne({email: req.body.email})
  if(!user){
    return res.status(400).send('Hatalı email yada parola')
  }
  const is_success = await bcrypt.compare(req.body.password,user.password)
  if(!is_success){
    return res.status(400).send('hatlı email yada password')
  }
  const token = user.createAuthToken()
  res.send(token)
})


module.exports = router