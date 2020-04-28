const mongoose = require("mongoose");

const storyCountSchema = new mongoose.Schema({
  lastId: { type: Number, default: 1 },
});

module.exports = mongoose.model("StoryCount", storyCountSchema);
