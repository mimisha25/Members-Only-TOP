const { Router } = require('express');
const carRouter = Router();
const userController = require('../../controllers/category/carController');
const catchAsync = require('../../utils/catchAsync');


carRouter.get('/cars', catchAsync(userController.getCars));
carRouter.get('/car-details/:id', catchAsync(userController.getCarDetails));
carRouter.get('/car-details/:id/edit', catchAsync(userController.getCarEdit));
carRouter.patch('/cars-details/:id', catchAsync(userController.getCarUpdate));
carRouter.delete('/cars-details/:id', catchAsync(userController.deleteCar));

carRouter.get('/cars/add', catchAsync(userController.createCarGet));
carRouter.post('/cars/add', catchAsync(userController.createCarPost));
module.exports = carRouter;