const fs = require('fs')

const router = require('express').Router();

const Home = require('../../database/home');
const {
  getProductFilterByCategorySchema,
  getProductOneSchema,
  createOrderSchema,
  createConsultationSchema
} = require('./schema');

const { catchError } = require('../../utils/helper');

const getCategories = catchError(async (req, res, next) => {
  const result = await Home.getCategories();

  return res.status(200).send({
    message: 'Category list',
    data: result
  })
});

const getProducts = catchError(async (req, res, next) => {
  const result = await Home.getProducts([req.headers.host]);

  if (result.length === 0) {
    return next({
      status: 404,
      message: 'Products not found'
    })
  }

  return res.status(200).send({
    message: 'Products list',
    data: result
  })
});

const getProductFilterByCategory = catchError(async (req, res, next) => {
  const { error, value } = getProductFilterByCategorySchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }

  const result = await Home.getProductFilterByCategory([req.headers.host, value.categoryId]);

  return res.status(200).send({
    message: 'Products list',
    data: result
  })
});

const getProductOne = catchError(async (req, res, next) => {
  const { error, value } = getProductOneSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }

  const result = await Home.getProductOne([req.headers.host, value.productId]);

  return res.status(200).send({
    message: 'Product',
    data: result
  })
});

const getSite = catchError(async (req, res, next) => {
  const result = await Home.getSite();

  return res.status(200).send({
    message: 'Site info',
    data: result
  })
});

const createOrder = catchError(async (req, res, next) => {
  const { error, value } = createOrderSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  if (value.productId) {
    let productOne = await Home.getProductOne([req.headers.host, value.productId]);

    if (productOne.length === 0) {
      return next({
        status: 404,
        message: 'Products not found'
      })
    } else
      if (productOne[0].status_id === 3) {
        return res.status(406).send({
          status: 406,
          message: 'Product is not available'
        })
      }


  }
  let result = await Home.createOrder([value.productId, value.name, value.phoneNumber, value.address, value.location]);

  return res.status(201).send({
    message: 'Order created',
    data: result
  })
});

const createConsultation = catchError(async (req, res, next) => {
  const { error, value } = createConsultationSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Home.createConsultation([value.name, value.phoneNumber]);

  return res.status(201).send({
    message: 'Consultation created',
    data: result
  })
})

router.get('/category', getCategories);
router.get('/product', getProducts);
router.get('/product/category/:categoryId', getProductFilterByCategory);
router.get('/product/:productId', getProductOne);
router.get('/site', getSite);
router.post('/order', createOrder);
router.post('/consultation', createConsultation);

module.exports = router;