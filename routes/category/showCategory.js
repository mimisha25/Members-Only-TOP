
const { Router } = require('express');
const showCategoryItemRouter = Router();
const userController = require('../../controllers/category/showCategoryItem');

showCategoryItemRouter.get('/categories/:categoryName', userController.getCarsByCategory);

module.exports = showCategoryItemRouter;