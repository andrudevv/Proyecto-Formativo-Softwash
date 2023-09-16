import Joi from 'joi';

// const id = Joi.number().integer();
const name = Joi.string().min(1).max(15);

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name
});

const getCategorySchema = Joi.object({
  name: name.required(),
});

export { createCategorySchema, updateCategorySchema, getCategorySchema }