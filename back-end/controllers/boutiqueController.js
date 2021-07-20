const express = require("express");
const { getAllItems } = require("../queries/stock");

const boutique = express.Router();

boutique.get("/", async (req, res) => {
    const allItems = await getAllItems();
    res.json(allItems);
});

module.exports = boutique;