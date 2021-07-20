const express = require("express");
const { getAllItems, getItem, addItem, updateItem, deleteItem } = require("../queries/stock");

const boutique = express.Router();

boutique.get("/", async (req, res) => {
    const allItems = await getAllItems();
    res.json(allItems);
});

boutique.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const item = await getItem(id);
        if (item.id) {
            res.json(item)
        } else {
            throw `Item not found`;
        }
    } catch (e) {
        res.status(404).json({ error: "NOT BOUJEE ENOUGH", message: e });
    }
});

boutique.post("/", async (req, res) => {
    try {
        const item = await addItem(req.body);
        if (item["id"]) {
            res.json(item);
        } else {
            console.log(`Database error: ${item}`);
            throw `Error adding ${req.body} to database`;
        }
    } catch (e) {
        res.status(404).json({ error: "NOT BOUJEE ENOUGH TO ADD.", message: e });
    }
});

boutique.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteItem(id)
        if (deleted.id) {
            res.json(deleted);
        } else {
            throw "Resource not found.";
        }
    } catch (error) {
        res.status(404).json({ error: "CANNOT DELETE BOUJEE", message: error })
    }
});


boutique.put("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const item = await updateItem(id, req.body)
        if (item.id) {
            res.json(item)
        } else {
            throw `There is no item with id: ${id}`
        }
    } catch (e) {
        return e
    }
});

module.exports = boutique;