const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    src: String,
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = blogSchema;
