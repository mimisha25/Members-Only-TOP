const { Router } = require('express');
const categoryRouter = Router();
const userController = require('../../controllers/category/categoryController');
const catchAsync = require('../../utils/catchAsync');



categoryRouter.get('/categories', catchAsync(userController.getCategories));
categoryRouter.post('/categories/archive/:id', catchAsync(userController.archiveCategory));
categoryRouter.post('/categories/prevent-deletion/:id', catchAsync(userController.deletion));
categoryRouter.get('/categories/add', catchAsync(userController.createCategoryGet));
categoryRouter.post('/categories/add', catchAsync(userController.createCategoryPost));

module.exports = categoryRouter;
