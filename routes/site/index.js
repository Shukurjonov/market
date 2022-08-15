const fs = require('fs')

const router = require('express').Router();

const Site = require('../../database/site');
const {
  updatePhoneNumberSchema,
} = require('./schema');

const { catchError } = require('../../utils/helper');


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
router.put('/phoneNumber', updatePhoneNumber);
// router.put('/address', putAddress);
// router.put('/workTime', putWorkTime);
// router.put('/telegramLink', putTelegramLink);
// router.put('/instagramLink', putInstagramLink);

module.exports = router;