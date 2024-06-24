const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const BlogSchemaValidation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).max(500).required(),
  src: Joi.string().uri(),
  likes: Joi.array().default([]),
  comments: Joi.array().default([]),
  creatorId: Joi.objectId(),
});

module.exports = BlogSchemaValidation;
