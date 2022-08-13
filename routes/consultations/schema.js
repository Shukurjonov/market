const Joi = require('joi');

const updateConsultationSchema = Joi.object({
  consultationId: Joi.number().required(),
})

const deleteConsultationSchema = Joi.object({
  consultationId: Joi.number().required(),
})

module.exports = { updateConsultationSchema, deleteConsultationSchema };