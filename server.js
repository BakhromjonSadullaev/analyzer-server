const express = require("express");
const mongoose = require("mongoose");
const Entity = require("./models/entityModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Node API...");
});

app.get("/entities", async (req, res) => {
  try {
    const entity = await Entity.find({});
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/entities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await Entity.findById(id);
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/entities", async (req, res) => {
  try {
    const entity = await Entity.create(req.body);
    res.status(200).json(entity);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/entities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await Entity.findByIdAndUpdate(id, req.body);
    if (!entity) {
      return res
        .status(404)
        .json({ message: `Cannot find entity with ID ${id}` });
    }
    const updatedEntity = await Entity.findById(id);
    res.status(200).json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/entities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await Entity.findByIdAndDelete(id);
    if (!entity) {
      return res
        .status(404)
        .json({ message: `Cannot find entity with ID ${id}` });
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb+srv://admin:admin_123@analyzer-api.2kyd5cd.mongodb.net/")
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
      console.log("Node Api App is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
