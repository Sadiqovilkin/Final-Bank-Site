const mongoose = require("mongoose");
const blogSchema = require('../schemas/blog.schema');

const BlogModel = mongoose.model("Blogs", blogSchema);

module.exports = BlogModel;