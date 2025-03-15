const { Router } = require('express');
const carRouter = Router();
const userController = require('../../controllers/category/carController');

carRouter.get('/cars', userController.getCars);
carRouter.get('/car-details/:id', userController.getCarDetails);
carRouter.get('/car-details/:id/edit', userController.getCarEdit);
carRouter.patch('/cars-details/:id', userController.getCarUpdate);
carRouter.delete('/cars-details/:id', userController.deleteCar);

carRouter.get('/cars/add', userController.createCarGet);
carRouter.post('/cars/add', userController.createCarPost);
module.exports = carRouter;