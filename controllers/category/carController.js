const db = require('../../config/queriesCar');
const ExpressError = require('../../utils/ExpressError');

async function getCars(req, res) {
    const admin = req.user && req.user.admin ? req.user.admin : false;
    const cars = await db.getCars();
    res.render('car/cars', { cars, admin })
}

async function getCarDetails(req, res) {
    const { id } = req.params;
    const admin = req.user && req.user.admin ? req.user.admin : false;
    const car = await db.getCarDetails(id);
    if (!car) throw new ExpressError('Invalid Car Data', 400);
    res.render('car/carDetails', { car, admin })
}
async function getCarEdit(req, res) {
    const { id } = req.params;
    const car = await db.getCarDetails(id);
    if (!car) throw new ExpressError('Invalid Car Data', 400);
    res.render('car/editCar', { car });
}
async function getCarUpdate(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedCar = await db.updateCar(id, title, description);
    res.redirect(`/car-details/${updatedCar.id}`);
}
async function deleteCar(req, res) {
    const { id } = req.params;
    await db.deleteCar(id);
    req.flash('success', 'Successfully deleted the car!')
    res.redirect('/cars');
}
async function createCarGet(req, res) {
    const categories = await db.getCategories();
    res.render('car/addCar', { title: "Create Car", categories });
}


async function createCarPost(req, res) {
    const { title, description, category_id, image } = req.body;
    await db.insertCar(title, description, category_id, image);
    req.flash('success', 'Successfully added new car!')
    res.redirect('/cars');
}




module.exports = {
    getCarDetails,
    getCarEdit,
    getCars,
    getCarUpdate,
    createCarGet,
    createCarPost,
    deleteCar
}

