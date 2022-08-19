const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(4).alphanum().required(),
});

const registerSchema = Joi.object({
  firstName: Joi.string().min(0).max(20).required(),
  lastName: Joi.string().min(0).max(30).required(),
  username: Joi.string().min(0).max(15).required(),
  password: Joi.string().min(4).alphanum().required(),
  roleId: Joi.number().required()
});

module.exports = { loginSchema, registerSchema };