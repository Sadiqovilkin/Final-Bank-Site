const mongoose = require("mongoose");
const blogSchema = require('../schemas/blog.schema');
console.log("Test");
const BlogModel = mongoose.model("FinalBlogs", blogSchema);

module.exports = BlogModel;