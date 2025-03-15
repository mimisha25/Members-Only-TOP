const pool = require('./pool');
const { v4: uuid } = require('uuid');


async function getCars() {
    try {
        const { rows } = await pool.query(
            `SELECT
            c.id,
            c.title,
            c.description,
            c.image,
            ca.name AS category_name
            FROM cars c
            LEFT JOIN categories ca ON c.category_id = ca.id;
             `
        );
        return rows;
    } catch (e) {
        console.error('Error fetching cars: ', e);
        throw e;
    }
}
async function insertCar(title, description, category_id, image) {
    try {
        const id = uuid();
        await pool.query(
            `INSERT INTO cars (id, title, description,category_id,  image) 
                    VALUES ($1, $2, $3, $4, $5);`,
            [id, title, description, category_id, image]
        );
    } catch (e) {
        console.error('Error inserting car: ', e)
        throw e;
    }
}
async function getCarDetails(id) {
    try {
        const { rows } = await pool.query("SELECT * FROM cars WHERE id=$1", [id]);
        return rows[0];
    } catch (e) {
        console.error('Error in getting car details: ', e)
        throw e;
    }
}

async function updateCar(id, title, description) {
    try {
        const query = `
        UPDATE cars
        SET title = $1, description = $2
        WHERE id = $3
    RETURNING *
        `;
        const { rows } = await pool.query(query, [title, description, id]);
        return rows[0];
    } catch (e) {
        console.error('Error in editing car details: ', e)
        throw e;
    }
}

async function deleteCar(id) {
    try {
        await pool.query("DELETE FROM cars WHERE id=$1", [id])
    } catch (e) {
        console.error('Error in deleting one car: ', e)
        throw e;
    }
}



async function getCategories() {
    try {
        const { rows } = await pool.query("SELECT *FROM categories");
        return rows;
    } catch (e) {
        console.error('Error fetching categories: ', e);
        throw e;
    }
}
async function insertCategory(name, description) {
    try {
        const id = uuid();
        await pool.query(
            `INSERT INTO categories (id, name, description) 
                    VALUES ($1, $2, $3);`,
            [id, name, description]
        );
    } catch (e) {
        console.error('Error inserting product: ', e)
        throw e;
    }
}



async function getCarsByCategory(categoryId) {
    try {
        const { rows } = await pool.query("SELECT * FROM cars WHERE category_id=$1", [categoryId]);
        return rows;
    } catch (e) {
        console.error('Error fetching cars by category: ', e);
        throw e;
    }
}

async function archiveCategoryById(id) {
    try {
        await pool.query('UPDATE categories SET status = $1 WHERE id = $2', ['archived', id]);
    } catch (e) {
        console.error('Error archiving category: ', e);
        throw e;
    }
}

async function hasProductsInCategory(categoryId) {
    try {
        const { rows } = await pool.query('SELECT COUNT(*) FROM cars WHERE category_id = $1', [categoryId]);
        return rows[0].count > 0;
    } catch (e) {
        console.error('Error checking cars in category: ', e);
        throw e;
    }
}

async function setPreventDeletionFlag(id) {
    try {
        await pool.query('UPDATE categories SET prevent_deletion = $1 WHERE id = $2', [true, id]);
    } catch (e) {
        console.error('Error setting prevent deletion flag: ', e);
        throw e;
    }
}

async function deleteCategory(id) {
    try {
        await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    } catch (e) {
        console.error('Error deleting category: ', e);
        throw e;
    }
}


module.exports = {
    getCars,
    getCategories,
    deleteCar,
    getCarDetails,
    updateCar,
    insertCar,
    getCarsByCategory,
    deleteCategory,
    setPreventDeletionFlag,
    hasProductsInCategory,
    archiveCategoryById,
    insertCategory,
}