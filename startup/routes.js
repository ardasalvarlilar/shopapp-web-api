const express = require('express')
const products = require('../routes/products')
const categories = require('../routes/categories')
const users = require('../routes/user')
const home = require('../routes/home')
const error = require('../middleware/error')
module.exports = (app) => {
  app.use(express.json())
  app.use("/api/products",products)
  app.use("/api/categories",categories)
  app.use("/api/users",users)
  app.use('',home)
  app.use(error)
}