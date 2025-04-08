
const db = require('../../config/queriesCar');

async function getCategories(req, res) {
    const admin = req.user && req.user.admin ? req.user.admin : false;
    const categories = await db.getCategories();
    res.render('category/categories', { categories, admin })
}

async function archiveCategory(req, res) {
    const { id } = req.params;
    const hasCars = db.hasProductsInCategory(id);
    if (hasCars) {
        req.flash('error', 'Cannot archieve category with cars inside');
        return res.redirect('/categories');
    }
    await db.archiveCategoryById(id);
    req.flash('success', 'Category archieved successfully');

    res.redirect('/categories');
}



async function deletion(req, res) {
    const { id } = req.params;
    const hasCars = await db.hasProductsInCategory(id);
    if (hasCars) {
        await db.setPreventDeletionFlag(id);
        req.flash('error', 'Cannot delete category with cars inside');
        return res.redirect('/categories');
    } else {
        await db.deleteCategory(id);
        req.flash('success', 'Category deleted successfully');
        res.redirect('/categories');
    }

}
async function createCategoryPost(req, res) {
    const { name, description } = req.body;
    await db.insertCategory(name, description);
    req.flash('success', 'New category has been added!');
    res.redirect('/categories');

}
async function createCategoryGet(req, res) {
    res.render('category/addCategory', { title: "Create Product" });
}




module.exports = {
    getCategories,
    archiveCategory,
    deletion,
    createCategoryPost,
    createCategoryGet
}




