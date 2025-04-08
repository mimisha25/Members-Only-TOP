
const { Router } = require('express');
const showCategoryItemRouter = Router();
const userController = require('../../controllers/category/showCategoryItem');
const catchAsync = require('../../utils/catchAsync');


showCategoryItemRouter.get('/categories/:categoryName', catchAsync(userController.getCarsByCategory));

module.exports = showCategoryItemRouter;