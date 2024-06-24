const BlogModel = require("../models/blog.model");

const blog_controller = {
  getAll: async (req, res) => {
    const blogs = await BlogModel.find();

    if (blogs.length > 0) {
      res.status(200).send({
        message: "success",
        data: blogs,
      });
    } else {
      res.send({
        message: "not found",
        data: null,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    let blog;
    try {
      blog = await BlogModel.findById(id);
    } catch (error) {
      res.send({ error: error });
    }
    if (blog) {
      res.status(200).send({
        message: "success",
        data: blog,
      });
    } else {
      res.send({
        message: "no content",
        data: null,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    let response;
    try {
      response = await BlogModel.findByIdAndDelete(id);
    } catch (error) {
      res.send({
        error: error,
      });
    }
    res.send({
      message: "deleted",
      response: response,
    });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const response = await BlogModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  },
  post: async (req, res) => {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.send({
      message: "posted",
      data: blog,
    });
  },
};

module.exports = blog_controller;
