const db = require("../db/dbConfig");

const getAllItems = async () => {
    try {
        const allItems = await db.any("SELECT * FROM boutique");
        return allItems;
    } catch (error) {
        return error;
    }
};

const getItem = async (id) => {
    try {
        const item = await db.one("SELECT * FROM boutique WHERE id=$1", id);
        return item;
    } catch (err) {
        return err;
    }
};

const addItem = async (item) => {
    try {
        if (!item.name) {
            throw 'You must specify a value for name';
        }
        const newItem = await db.one("INSERT INTO boutique (name, brand, category, price, in_stock, url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [item.name, item.brand, item.category, item.price, item.in_stock, item.url]);
        return newItem;
    } catch (error) {
        return error
    }
}

const updateItem = async (id, item) => {
    try {
        return await db.one(
            "UPDATE boutique SET name=$1, brand=$2, category=$3, price=$4, in_stock=$5, url=$6  WHERE id=$7 RETURNING *",
            [item.name, item.brand, item.category, item.price, item.in_stock, item.url, id]
        );
    } catch (e) {
        return e;
    }
};

const deleteItem = async (id) => {
    try {
        const deleted = await db.one("DELETE FROM boutique WHERE id=$1 RETURNING *", id)
        return deleted;
    } catch (error) {
        return error
    }

}

module.exports = {
    getAllItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
}