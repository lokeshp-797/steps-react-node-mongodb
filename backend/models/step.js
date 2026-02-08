const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
});
module.exports = mongoose.model("Step", stepSchema);
