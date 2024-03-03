const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const Joi = require('joi')

const commentSchema = mongoose.Schema({
  text: String,
  username: String,
  date: {
    type: Date,
    default: Date.now
  }
})

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image_url: String,
  date: {
    type: Date,
    default: Date.now
  },
  is_active: Boolean,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  comments: [commentSchema]
})
function validateProduct(product){
  const schema = new Joi.object({
    name: Joi.string().required().min(3).max(30),
    price: Joi.number().required().min(0),
    description: Joi.string(),
    image_url: Joi.string(),
    is_active: Joi.boolean(),
    category: Joi.string(),
    comments: Joi.array()
  })
  return schema.validate(product)
}
const Product = mongoose.model('Product',productSchema)
const Comment = mongoose.model('Comment',commentSchema)
module.exports = {Product,Comment,validateProduct}