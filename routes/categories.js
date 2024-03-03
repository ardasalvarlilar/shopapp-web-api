const express = require('express')
const router = express.Router()
const { Category,validateCategory } = require('../models/category')

router.get('/', async(req,res) => {
  const categories = await Category.find().populate('products','-_id -category')
  res.send(categories)
})

router.get('/:id', async(req,res) => {
  const category = await Category.findById(req.params.id)
  if(!category){
    return res.status(404).send('Aradığınız kategori yok')
  }
  res.send(category)
})

router.post('/', async(req,res) => {
  const {error} = validateCategory(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }
  const category = new Category({
    name: req.body.name,
    products: req.body.products
  })
  const new_category = await category.save()
  res.send(new_category)
})

router.put('/:id', async(req,res) => {
  const category = await Category.findById(req.params.id)
  if(!category){
    return res.status(404).send('güncellemek istediğiniz kategori bulunamadı')
  }
  const {error } = validateCategory(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }
  category.name = req.body.name
  const updated_category = await category.save()
  res.send(updated_category)
})

router.delete('/:id', async(req,res) => {
  const category = await Category.findByIdAndDelete(req.params.id)
  if(!category){
    return res.status(404).send('silmek istediğiniz kategori bulunamadı')
  }
  res.send(category)
})

module.exports = router