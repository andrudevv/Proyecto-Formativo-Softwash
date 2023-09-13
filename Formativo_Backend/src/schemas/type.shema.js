import Joi from 'joi';

const id = Joi.number().integer();
const type = Joi.string().min(1).max(15);

const createTypeSchema = Joi.object({
    type: type.required(),
});

const updateTypeSchema = Joi.object({
    type: type
});

const getTypeSchema = Joi.object({
  id: id.required(),
});

export { createTypeSchema, updateTypeSchema, getTypeSchema }