const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const duration = Joi.string();
const description = Joi.string();
const price = Joi.string();
const typeVehicles = Joi.string().valid("carro", "moto");

const getServiceSchema = Joi.object({
  id: id.required(),
});

const getQuery = Joi.object({
  limit: Joi.string(),
  offset: Joi.string(),
});
const createServiceShema = Joi.object({
  name: name.required(),
  duration: duration.required(),
  description: description.required(),
  price: price.required(),
  typeVehicles: typeVehicles.required(),
});

const updateServiceShema = Joi.object({
  name: name,
  duration: duration,
  description: description,
  price: price,
  typeVehicles: typeVehicles,
});

module.exports = {
  getServiceSchema,
  createServiceShema,
  updateServiceShema,
  getQuery,
};
