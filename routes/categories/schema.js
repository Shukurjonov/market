const Joi = require('joi');

const getCategoryOneSchema = Joi.object({
  categoryId: Joi.number().required()
})

const createCategorySchema = Joi.object({
  nameRu: Joi.string().min(0).max(20).required(),
  nameUz: Joi.string().min(0).max(20).required(),
  createdBy: Joi.number().required()
})

const updateCategorySchema = Joi.object({
  categoryId: Joi.number().required(),
  nameRu: Joi.string().min(0).max(20),
  nameUz: Joi.string().min(0).max(20),
  updatedAt: Joi.date().required(),
  updateBy: Joi.number().required()
})

const deleteCategorySchema = Joi.object({
  categoryId: Joi.number().required(),
  updatedAt: Joi.date().required(),
  updateBy: Joi.number().required()
})

module.exports = { getCategoryOneSchema, createCategorySchema, updateCategorySchema, deleteCategorySchema };