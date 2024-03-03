require('express-async-errors')
const express = require('express')
const router = express.Router()
const { Product,Comment, validateProduct } = require('../models/product')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/is-admin')

router.get('/',async(req,res,next) => {
  const products = await Product.find().populate('category','name').select('-is_active')
  res.send(products)
})

router.post('/',auth,isAdmin, async (req,res) => {
  const result = validateProduct(req.body)
  if(result.error){
    return res.status(400).send(result.error.details[0].message)
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image_url: req.body.image_url,
    is_active: req.body.is_active,
    category: req.body.category,
    comments: req.body.comments
  })
    const new_product = await product.save()
    res.send(new_product)
})

router.put('/comment/:id',auth,async (req,res) => {
  const product = await Product.findById(req.params.id)
  if(!product){
    return res.status(404).send('aradığınız ürün bulunamadı')
  }
  const comment = new Comment({
    text: req.body.text,
    username: req.body.username
  })
  product.comments.push(comment)
  const updated_product = await product.save()
  res.send(updated_product)
})

router.delete('/comment/:id',auth,async (req,res) => {
  const productId = req.params.id;
  const commentId = req.body.commentid;
  const product = await Product.findById(productId)
  if(!product){
    return res.status(404).send('aradığınız ürün bulunamadı')
  }
  product.comments.pull(commentId);
  const updatedProduct = await product.save();
  res.send(updatedProduct);
})


router.put('/:id',auth,isAdmin,async(req,res) => {

  // const updated_product = await Product.updateOne({_id: req.params.id},{
  //     name: req.body.name,
  //     description: req.body.description,
  //     price: req.body.price,
  //     image_url: req.body.image_url,
  //     is_active: req.body.is_active
  // })
  // res.send(updated_product)

  const updated_product = await Product.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image_url: req.body.image_url,
    is_active: req.body.is_active,
    category: req.body.category
  },{new: true})
  res.send(updated_product)


  // const product = await Product.findById(req.params.id)
  // if(!product){
  //   return res.status(404).send('aradığınız ürün bulunamadı')
  // }
  // const result = validateProduct(req.body)
  // if(result.error){
  //   return res.status(400).send(result.error.details[0].message)
  // }
  // product.name = req.body.name
  // product.price = req.body.price
  // product.description = req.body.description
  // product.image_url = req.body.image_url
  // product.is_active = req.body.is_active
  // const updated_product = await product.save()
  // res.send(updated_product)
})

router.delete('/:id',auth,isAdmin,async(req,res) => {
  // const result = await Product.deleteOne({_id: req.params.id}) // silme işlemi ile ilgili bilgi döner
  const product = await Product.findByIdAndDelete(req.params.id) // silinen ürün bilgilerini döner
  if(!product){
    return res.status(404).send('aradığınız ürün bulunamadı')
  }
  res.send(product)
})

router.get('/:id',async(req,res) => {
  const product = await Product.findOne({_id: req.params.id}).populate('category')
  if(!product){
    return res.status(404).send('aradığınız ürün bulunamadı')
  }
  res.status(200).send(product)
})


module.exports = router