const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const duraction = Joi.string();
const description = Joi.string();
const price = Joi.number().integer();
const typeVehicle = Joi.string().valid("carro", "moto");

const getServiceSchema = Joi.object({
  id: id.required(),
});

const getQuery = Joi.object({
  limit: Joi.string(),
  offset: Joi.string(),
});
const createServiceShema = Joi.object({
  name: name.required(),
  duraction: duraction.required(),
  description: description.required(),
  price: price.required(),
  typeVehicle: typeVehicle.required(),
});

const updateServiceShema = Joi.object({
  name: name,
  duraction: duraction,
  description: description,
  price: price,
  typeVehicle: typeVehicle,
});

module.exports = {
  getServiceSchema,
  createServiceShema,
  updateServiceShema,
  getQuery,
};
