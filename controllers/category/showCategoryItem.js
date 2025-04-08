const db = require('../../config/queriesCar');
const ExpressError = require('../../utils/ExpressError')
async function getCarsByCategory(req, res) {
    const admin = req.user && req.user.admin ? req.user.admin : false;
    const { categoryName } = req.params;
    const categories = await db.getCategories();
    const category = categories.find(cat => cat.name.trim().toLowerCase() === categoryName.trim().toLowerCase());
    if (!category) throw new ExpressError('Category not found', 400);
    const cars = await db.getCarsByCategory(category.id);
    res.render('category/category', { cars, categoryName: category.name, admin })
}

module.exports = {
    getCarsByCategory
}