const { Router } = require('express');
const categoryRouter = Router();
const userController = require('../../controllers/category/categoryController');

categoryRouter.get('/categories', userController.getCategories);
categoryRouter.post('/categories/archive/:id', userController.archiveCategory);
categoryRouter.post('/categories/prevent-deletion/:id', userController.deletion);
categoryRouter.get('/categories/add', userController.createCategoryGet);
categoryRouter.post('/categories/add', userController.createCategoryPost);

module.exports = categoryRouter;
