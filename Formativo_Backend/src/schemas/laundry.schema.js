const Joi = require("joi");

const id = Joi.number().integer();
const rutLaundry = Joi.number().integer();
const name = Joi.string();
const address = Joi.string();
const phone = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const municipalityId = Joi.number().integer();
const membership = Joi.boolean();
const ability = Joi.number().integer();
const aperture = Joi.string();
const closing = Joi.string();

const getLaundryQuery = Joi.object({
  department: (department = Joi.string()),
  municipality: (municipality = Joi.string()),
  typeVehicles: (typeVehicles = Joi.string()),
  limit: (limit = Joi.string()),
  offset: (offset = Joi.string()),
});

const createLaundrySchema = Joi.object({
  rutLaundry: rutLaundry.required(),
  name: name.required(),
  address: address.required(),
  phone: phone.required(),
  email: email.required(),
  password: password.required(),
  ability: ability.required(),
  aperture: aperture.required(),
  closing: closing.required(),
  municipalityId: municipalityId.required().messages({
    "number.empty": "este campo no puede estar vacio",
    "number.base": "Municipio' este campo debe seleccionarse",
  }),
});

const updateLaundrySchema = Joi.object({
  rutLaundry: rutLaundry.required(),
  name: name.required(),
  address: address.required(),
  phone: phone.required(),
  email: email.required(),
  ability: ability.required(),
  municipalityId: municipalityId.required(),
  aperture: aperture.required(),
  closing: closing.required(),
});

const getLaundrySchema = Joi.object({
  id: id.required(),
});

const getLaundrysSchema = Joi.object({
  municipalityId: municipalityId.required(),
});

const loginLaundrySchema = Joi.object({
  rutLaundry: rutLaundry.required(),
  email: email.required(),
  password: password.required(),
});
module.exports = {
  createLaundrySchema,
  updateLaundrySchema,
  getLaundrySchema,
  loginLaundrySchema,
  getLaundrysSchema,
  getLaundryQuery,
};
