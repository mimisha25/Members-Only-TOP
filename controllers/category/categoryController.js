
const db = require('../../config/queriesCar');

async function getCategories(req, res) {
    try {
        const categories = await db.getCategories();
        console.log('Categories: ', categories);
        res.render('category/categories', { categories })
    } catch (e) {
        console.log('Error in getting categories: ', e)
        throw e;
    }
}

async function archiveCategory(req, res) {
    try {
        const { id } = req.params;
        await db.archiveCategoryById(id);

        res.redirect('/categories');
    } catch (e) {
        console.error('Error archiving category: ', e);
        res.status(500).render('partials/modal', { text: 'The category has products, it cannot be archieved', link: '/categories' });
    }
}



async function deletion(req, res) {
    try {
        const { id } = req.params;
        const hasCars = await db.hasProductsInCategory(id);
        if (hasCars) {
            await db.setPreventDeletionFlag(id);
            res.redirect('/categories');
        } else {
            await db.deleteCategory(id);
            res.redirect('/categories');
        }
    } catch (e) {
        console.error('Error preventing deletion: ', e);
        res.status(500).render('partials/modal', { text: 'The category has products, it cannot be deleted', link: '/categories' });
    }
}
async function createCategoryPost(req, res) {
    const { name, description } = req.body;

    try {
        await db.insertCategory(name, description);
        res.redirect('/categories');
    } catch (e) {
        res.status(400).send('Error inserting product: ' + e.message);
    }
}
async function createCategoryGet(req, res) {
    try {

        res.render('category/addCategory', { title: "Create Product" });
    } catch (e) {
        console.error('Error fetching categories:', e);
        res.status(500).send('Error fetching categories');
    }
}




module.exports = {
    getCategories,
    archiveCategory,
    deletion,
    createCategoryPost,
    createCategoryGet
}




