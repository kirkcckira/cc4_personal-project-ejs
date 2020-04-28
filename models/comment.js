const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: String,
  commentator: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
