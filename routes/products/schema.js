const Joi = require('joi');

const getProductOneSchema = Joi.object({
  productId: Joi.number().required()
})

const createProductSchema = Joi.object({
  categoryId: Joi.number().required(),
  productImage: Joi.string().required(),
  price: Joi.number().required(),
  salePrice: Joi.number(),
  quantity: Joi.number().required(),
  frameRu: Joi.string().min(0).max(150).required(),
  frameUz: Joi.string().min(0).max(150).required(),
  size: Joi.string().min(0).max(10).required(),
  depth: Joi.number().required(),
  equipmentRu: Joi.string().min(0).max(150).required(),
  equipmentUz: Joi.string().min(0).max(150).required(),
  statusId: Joi.number().required(),
})

const updateProductSchema = Joi.object({
  productId: Joi.number().required(),
  categoryId: Joi.number(),
  productImage: Joi.string(),
  price: Joi.number(),
  salePrice: Joi.number(),
  quantity: Joi.number(),
  frameRu: Joi.string().min(0).max(150),
  frameUz: Joi.string().min(0).max(150),
  size: Joi.string().min(0).max(10),
  depth: Joi.number(),
  equipmentRu: Joi.string().min(0).max(150),
  equipmentUz: Joi.string().min(0).max(150),
  statusId: Joi.number(),
})

const deleteProductSchema = Joi.object({
  productId: Joi.number().required()
})

const getProductFilterByCategorySchema = Joi.object({
  categoryId: Joi.number().required()
})

module.exports = {
  getProductOneSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductFilterByCategorySchema
};