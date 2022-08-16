const fs = require('fs')
const path = require('path')

const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

const Categories = require('../../database/categories');
const {
  getCategoryOneSchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema
} = require('./schema');

const { catchError } = require('../../utils/helper');

const getCategories = catchError(async (req, res, next) => {
  const result = await Categories.getCategories();
  return res.status(200).send({
    message: 'Categories retrieved',
    data: result
  })
});

const getCategoryOne = catchError(async (req, res, next) => {
  const { error, value } = getCategoryOneSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Categories.getCategoryOne([value.categoryId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Category not found'
    })
  }

  return res.status(200).send({
    message: 'Categories retrieved',
    data: result
  })
});

const createCategory = catchError(async (req, res, next) => {
  const { error, value } = createCategorySchema.validate({ ...req.body, createdBy: req.user.id });

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Categories.createCategory([
    value.nameRu,
    value.nameUz,
    value.createdBy
  ]);

  if (result.length) {
    return res.status(200).send({
      message: 'Category created',
      data: result
    })
  } else {
    return res.status(500).send({
      message: 'Internal server error'
    })
  }
})

const updateCategory = catchError(async (req, res, next) => {

  const { error, value } = updateCategorySchema.validate({ ...req.params, ...req.body, updatedAt: new Date(), updateBy: req.user.id });

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Categories.updateCategory([
    value.nameRu,
    value.nameUz,
    value.updatedAt,
    value.updateBy,
    value.categoryId,
  ]);

  if (result.length) {
    return res.status(200).send({
      message: 'Category updated',
      data: result
    })
  } else {
    return res.status(500).send({
      message: 'Category not found'
    })
  }
})

const deleteCategory = catchError(async (req, res, next) => {
  const { error, value } = deleteCategorySchema.validate({ ...req.params, updatedAt: new Date(), updateBy: req.user.id });
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Categories.deleteCategory([value.updatedAt, value.updateBy, value.categoryId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Category not found'
    })
  }

  const products = await Categories.deleteProduct([value.categoryId]);
  return res.status(200).send({
    message: 'Category dateleted',
    data: result
  })
});

const restoreCategory = catchError(async (req, res, next) => {
  const { error, value } = deleteCategorySchema.validate({ ...req.params, updatedAt: new Date(), updateBy: req.user.id });
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Categories.restoreCategory([value.updatedAt, value.updateBy, value.categoryId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Category not found'
    })
  }


  const products = await Categories.restoreProduct([value.categoryId]);
  return res.status(200).send({
    message: 'Category dateleted',
    data: result
  })
});

router.get('/', getCategories);
router.get('/:categoryId', getCategoryOne);
router.post('/', createCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);
router.put('/restore/:categoryId', restoreCategory);

module.exports = router;