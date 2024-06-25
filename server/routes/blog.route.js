const express = require("express");
const blog_router = express.Router();
const controller = require("../controllers/blog.controller");
const blog_middleware = require("../middlewares/blog.post.middleware");

blog_router.get("/api/blogs", controller.getAll);
blog_router.get("/api/blogs/:id", controller.getOne);
blog_router.delete("/api/blogs/:id", controller.delete);
blog_router.patch("/api/blogs/:id", controller.update);
blog_router.post("/api/blogs", blog_middleware, controller.post);

module.exports = blog_router;
