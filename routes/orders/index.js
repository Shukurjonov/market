const fs = require('fs')
const path = require('path')

const router = require('express').Router();

const Order = require('../../database/orders');
const {
  updateOrdersSchema,
  deleteOrdersSchema
} = require('./schema');

const { catchError } = require('../../utils/helper');

const getOrders = catchError(async (req, res, next) => {
  const result = await Order.getOrders([req.headers.host]);
  return res.status(200).send({
    message: 'Orders retrieved',
    data: result
  })
});

const updateOrder = catchError(async (req, res, next) => {

  const { error, value } = updateOrdersSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Order.updateOrder([value.orderId]);

  if (result.length) {
    let product = await Order.updateProduct([result[0].status, result[0].product_id]);
    return res.status(200).send({
      message: 'Order updated',
      data: result
    })
  } else {
    return res.status(404).send({
      status: 404,
      message: 'Order not found!'
    })
  }
});

const deleteOrder = catchError(async (req, res, next) => {
  const { error, value } = deleteOrdersSchema.validate(req.params);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  const result = await Order.deleteOrder([value.orderId]);

  if (!result.length) {
    return res.status(404).send({
      status: 404,
      message: 'Order not found!'
    })
  }

  return res.status(200).send({
    message: 'Order dateleted',
    data: result
  })
});

router.get('/', getOrders);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;