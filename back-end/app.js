// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const boutiqueController = require("./controllers/boutiqueController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello bad and boujee bitches");
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////
const db = require("./db/dbConfig.js");

app.get("/test", async (req, res) => {
  try {
    const allDays = await db.any("SELECT * FROM boutique");
    res.json(allDays);
  } catch (err) {
    res.json(err);
  }
});

app.use("/boutique", boutiqueController);

app.get("*", (req, res) => {
  res.status(404).send("page not found")
})
/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////

// EXPORT
module.exports = app;
