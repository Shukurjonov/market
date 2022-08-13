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

// const updateCategory = catchError(async (req, res, next) => {

//   const { error, value } = updateProductSchema.validate({ ...req.params, ...req.body });

//   if (error) {
//     return next({
//       status: 400,
//       message: error.details[0].message
//     })
//   }

//   if (value.productImage) {
//     value.productImage = value.productImage.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
//     const foldername = 'images'
//     const filename = `${uuidv4()}.jpg`;
//     fs.writeFileSync(path.join(process.cwd(), 'uploads', foldername, filename), Buffer.from(value.productImage, 'base64'));
//   }

//   let result = await Produts.updateProduct([
//     value.categoryId,
//     value.productImage ? `${foldername}/${filename}` : null,
//     value.price,
//     value.salePrice,
//     value.quantity,
//     value.frameRu,
//     value.frameUz,
//     value.size,
//     value.depth,
//     value.equipmentRu,
//     value.equipmentUz,
//     value.statusId,
//     value.productId
//   ]);

//   if (result.length) {
//     return res.status(200).send({
//       message: 'Product updated',
//       data: result
//     })
//   } else {
//     return res.status(500).send({
//       message: 'Internal server error'
//     })
//   }
// })

// const deleteCategory = catchError(async (req, res, next) => {
//   const { error, value } = deleteProductSchema.validate(req.params);

//   if (error) {
//     return next({
//       status: 400,
//       message: error.details[0].message
//     })
//   }
//   const result = await Produts.deleteProduct([value.productId]);

//   if (!result.length) {
//     return res.status(404).send({
//       message: 'Product not found'
//     })
//   }

//   return res.status(200).send({
//     message: 'Products dateleted',
//     data: result
//   })
// });

router.get('/', getCategories);
router.get('/:categoryId', getCategoryOne);
router.post('/', createCategory);
// router.put('/:categoryId', updateCategory);
// router.delete('/:categoryId', deleteCategory);

module.exports = router;