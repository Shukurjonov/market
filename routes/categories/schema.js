const Joi = require('joi');

const getProductFilterByCategorySchema = Joi.object({
  categoryId: Joi.number().required()
})

const getProductOneSchema = Joi.object({
  productId: Joi.number().required()
})

const createOrderSchema = Joi.object({
  productId: Joi.number().required(),
  name: Joi.string().min(0).max(30).required(),
  phoneNumber: Joi.string().pattern(new RegExp('[(]?[0-9]{2}[)]?[ ]?[0-9]{3}[ ]?[-]?[0-9]{2}[ ]?[-]?[0-9]{2}')).required(),
  address: Joi.string().min(0).max(150).required(),
  location: Joi.string()
})

const createConsultationSchema = Joi.object({
  name: Joi.string().min(0).max(30).required(),
  phoneNumber: Joi.string().pattern(new RegExp('[(]?[0-9]{2}[)]?[ ]?[0-9]{3}[ ]?[-]?[0-9]{2}[ ]?[-]?[0-9]{2}')).required()
})

module.exports = {
  getProductFilterByCategorySchema,
  getProductOneSchema,
  createOrderSchema,
  createConsultationSchema
};