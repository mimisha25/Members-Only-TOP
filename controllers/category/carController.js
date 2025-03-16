const db = require('../../config/queriesCar');

async function getCars(req, res) {
    try {
        const admin = req.user.admin;
        const cars = await db.getCars();
        res.render('car/cars', { cars, admin })
    } catch (e) {
        console.log('Error in getting cars: ', e)
        throw e;
    }
}

async function getCarDetails(req, res) {
    const { id } = req.params;
    try {
        const admin = req.user.admin;
        const car = await db.getCarDetails(id);
        if (!car) return res.status(404).send('Car was not found!');
        res.render('car/carDetails', { car, admin })
    } catch (e) {
        console.error('Error in getting details of car in controller: ', e);
        throw e;
    }
}
async function getCarEdit(req, res) {
    const { id } = req.params;
    try {
        const car = await db.getCarDetails(id);
        if (!car) return res.status(404).send('Text not found!');
        res.render('car/editCar', { car });
    } catch (e) {
        console.error('Error in editCar controller: ', e);
        res.status(500).send('Server Error');
    }
}
async function getCarUpdate(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedCar = await db.updateCar(id, title, description);
        res.redirect(`/car-details/${updatedCar.id}`);
    } catch (e) {
        console.error('Error in carUpdate controller: ', e);
        res.status(500).send('Server Error');
    }
}
async function deleteCar(req, res) {
    const { id } = req.params;
    try {
        await db.deleteCar(id);
        res.redirect('/cars');
    } catch (e) {
        console.error('Error in deleteCar controller:', error);
        res.status(500).send('Server Error');
    }
}
async function createCarGet(req, res) {
    try {
        const categories = await db.getCategories();
        res.render('car/addCar', { title: "Create Car", categories });
    } catch (e) {
        console.error('Error fetching categories:', e);
        res.status(500).send('Error fetching categories');
    }
}


async function createCarPost(req, res) {
    const { title, description, category_id, image } = req.body;
    try {
        await db.insertCar(title, description, category_id, image);
        res.redirect('/cars');
    } catch (e) {
        res.status(400).send('Error inserting car: ' + e.message);
    }
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

