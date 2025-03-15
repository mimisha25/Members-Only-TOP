const db = require('../../config/queriesCar');

async function getCarsByCategory(req, res) {
    try {
        const { categoryName } = req.params;
        const categories = await db.getCategories();
        const category = categories.find(cat => cat.name.trim().toLowerCase() === categoryName.trim().toLowerCase());
        if (!category) {
            return res.status(404).send('Category not found nnn');
        }
        const cars = await db.getCarsByCategory(category.id);
        res.render('category/category', { cars, categoryName: category.name })
    } catch (e) {
        console.error('Error fetching products in category: ', e);
        res.status(500).send('Error fetching cars');
    }
}

module.exports = {
    getCarsByCategory
}