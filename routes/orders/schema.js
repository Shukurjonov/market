const Joi = require('joi');

const updateOrdersSchema = Joi.object({
  orderId: Joi.number().required()
})

const deleteOrdersSchema = Joi.object({
  orderId: Joi.number().required()
})

module.exports = {
  updateOrdersSchema,
  deleteOrdersSchema
};