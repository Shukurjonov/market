const Joi = require('joi');

const updatePhoneNumberSchema = Joi.object({
  phoneNumber: Joi.string().pattern(new RegExp('[(]?[0-9]{2}[)]?[ ]?[0-9]{3}[ ]?[-]?[0-9]{2}[ ]?[-]?[0-9]{2}')).required()
});

const updateAddressSchema = Joi.object({
  addressRu: Joi.string().min(0).max(150).required(),
  addressUz: Joi.string().min(0).max(150).required()
});

const updateWorkTimeSchema = Joi.object({
  workTimeRu: Joi.string().min(0).max(150).required(),
  workTimeUz: Joi.string().min(0).max(150).required()
});

const updateTelegramLinkSchema = Joi.object({
  telegramLink: Joi.string().min(0).max(150).required()
});

const updateInstagramLinkSchema = Joi.object({
  instagramLink: Joi.string().min(0).max(150).required()
});

module.exports = {
  updatePhoneNumberSchema,
  updateAddressSchema,
  updateWorkTimeSchema,
  updateTelegramLinkSchema,
  updateInstagramLinkSchema
};