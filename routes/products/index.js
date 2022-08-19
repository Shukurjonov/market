const fs = require('fs')
const path = require('path')

const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

const Produts = require('../../database/products');
const {
  getProductOneSchema,
  createProductSchema,
  updateProductSchema,
  getProductFilterByCategorySchema,
  deleteProductSchema
} = require('./schema');

const { catchError } = require('../../utils/helper');

const getProducts = catchError(async (req, res, next) => {
  const result = await Produts.getProducts([req.headers.host]);
  return res.status(200).send({
    message: 'Products retrieved',
    data: result
  })
});

const getProductOne = catchError(async (req, res, next) => {
  const { error, value } = getProductOneSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Produts.getProductOne([req.headers.host, value.productId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Product not found'
    })
  }

  return res.status(200).send({
    message: 'Products retrieved',
    data: result
  })
});

const getProductStatus = catchError(async (req, res, next) => {
  const result = await Produts.getProductStatus();
  return res.status(200).send({
    message: 'Product Status retrieved',
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

  const result = await Produts.getProductFilterByCategory([req.headers.host, value.categoryId]);

  return res.status(200).send({
    message: 'Products list',
    data: result
  })
});

const createProduct = catchError(async (req, res, next) => {

  const { error, value } = createProductSchema.validate(req.body);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  value.productImage = value.productImage.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
  const foldername = 'images'
  const filename = `${uuidv4()}.jpg`;

  fs.writeFileSync(path.join(process.cwd(), 'uploads', foldername, filename), Buffer.from(value.productImage, 'base64'));
  let result = await Produts.createProduct([
    value.categoryId,
    `${foldername}/${filename}`,
    value.price,
    value.salePrice,
    value.quantity,
    value.frameRu,
    value.frameUz,
    value.size,
    value.depth,
    value.equipmentRu,
    value.equipmentUz,
    value.statusId
  ]);

  if (result.length) {
    return res.status(201).send({
      message: 'Product created',
      data: result
    })
  } else {
    return res.status(500).send({
      message: 'Internal server error'
    })
  }
})

const updateProduct = catchError(async (req, res, next) => {

  const { error, value } = updateProductSchema.validate({ ...req.params, ...req.body });

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const foldername = 'images'
  const filename = `${uuidv4()}.jpg`;

  if (value.productImage && value.productImage != "null") {
    value.productImage = value.productImage.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
    fs.writeFileSync(path.join(process.cwd(), 'uploads', foldername, filename), Buffer.from(value.productImage, 'base64'));
  }

  let result = await Produts.updateProduct([
    value.categoryId,
    (value.productImage && value.productImage != 'null') ? `${foldername}/${filename}` : null,
    value.price,
    value.salePrice,
    value.quantity,
    value.frameRu,
    value.frameUz,
    value.size,
    value.depth,
    value.equipmentRu,
    value.equipmentUz,
    value.statusId,
    value.productId
  ]);

  if (result.length) {
    return res.status(200).send({
      message: 'Product updated',
      data: result
    })
  } else {
    return res.status(500).send({
      message: 'Internal server error'
    })
  }
})

const deleteProduct = catchError(async (req, res, next) => {
  const { error, value } = deleteProductSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Produts.deleteProduct([value.productId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Product not found'
    })
  }

  return res.status(200).send({
    message: 'Products dateleted',
    data: result
  })
});

router.get('/', getProducts);
router.get('/:productId', getProductOne);
router.get('/status/info', getProductStatus);
router.get('/category/:categoryId', getProductFilterByCategory);
router.post('/', createProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;