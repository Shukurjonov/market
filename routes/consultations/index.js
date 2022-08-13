const fs = require('fs')
const path = require('path')

const router = require('express').Router();

const Consultation = require('../../database/consultation');
const {
  updateConsultationSchema,
  deleteConsultationSchema
} = require('./schema');

const { catchError } = require('../../utils/helper');

const getConsultation = catchError(async (req, res, next) => {
  const result = await Consultation.getConsultation();
  return res.status(200).send({
    message: 'Consultation retrieved',
    data: result
  })
});

const updateConsultation = catchError(async (req, res, next) => {

  const { error, value } = updateConsultationSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Consultation.updateConsultation([value.consultationId]);

  if (result.length) {
    return res.status(200).send({
      message: 'Consultation updated',
      data: result
    })
  } else {
    return res.status(500).send({
      message: 'Internal server error'
    })
  }
})

const deleteConsultation = catchError(async (req, res, next) => {
  const { error, value } = deleteConsultationSchema.validate(req.params);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Consultation.deleteConsultation([value.consultationId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Consultation not found'
    })
  }

  return res.status(200).send({
    message: 'Consultation dateleted',
    data: result
  })
});

router.get('/', getConsultation);
router.put('/:consultationId', updateConsultation);
router.delete('/:consultationId', deleteConsultation);

module.exports = router;