const fs = require('fs')

const router = require('express').Router();

const Site = require('../../database/site');
const {
  updatePhoneNumberSchema,
  updateAddressSchema,
  updateWorkTimeSchema,
  updateTelegramLinkSchema,
  updateInstagramLinkSchema
} = require('./schema');

const { catchError } = require('../../utils/helper');

const getSite = catchError(async (req, res, next) => {
  const result = await Site.getSite();

  return res.status(200).send({
    message: 'Site info',
    data: result
  })
});

const updatePhoneNumber = catchError(async (req, res, next) => {
  const { error, value } = updatePhoneNumberSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  let result = await Site.updatePhoneNumber([value.phoneNumber]);

  return res.status(200).send({
    message: 'Phone number updated successfully',
    data: result
  })
});

const updateAddress = catchError(async (req, res, next) => {
  const { error, value } = updateAddressSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Site.updateAddress([value.addressRu, value.addressUz]);

  return res.status(200).send({
    message: 'Address updated successfully',
    data: result
  })
});

const updateWorkTime = catchError(async (req, res, next) => {
  const { error, value } = updateWorkTimeSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Site.updateWorkTime([value.workTimeRu, value.workTimeUz]);
  console.log(value)
  return res.status(200).send({
    message: 'Work Time updated successfully',
    data: result
  })
});

const updateTelegramLink = catchError(async (req, res, next) => {
  const { error, value } = updateTelegramLinkSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  let result = await Site.updateTelegramLink([value.telegramLink]);

  return res.status(200).send({
    message: 'Telegram link updated successfully',
    data: result
  })
});

const updateInstagramLink = catchError(async (req, res, next) => {
  const { error, value } = updateInstagramLinkSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  let result = await Site.updateInstagramLink([value.instagramLink]);

  return res.status(200).send({
    message: 'Instagram link updated successfully',
    data: result
  })
});

router.get('/', getSite);
router.put('/phoneNumber', updatePhoneNumber);
router.put('/address', updateAddress);
router.put('/workTime', updateWorkTime);
router.put('/telegramLink', updateTelegramLink);
router.put('/instagramLink', updateInstagramLink);

module.exports = router;