const mongoose = require("mongoose");

const entitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a entity name"],
    },
    coordinates: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Entity", entitySchema);
module.exports = Entity;
