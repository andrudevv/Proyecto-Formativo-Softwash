const Joi = require("joi");

const id = Joi.number().integer();
const amount = Joi.number().integer();
const date = Joi.date().iso();
const time = Joi.string();
const observations = Joi.string().allow(null,'');
const vehicleId = Joi.number().integer();
const serviceId = Joi.number().integer();

const createAppointmentSchema = Joi.object({
  amount: amount.required(),
  date: date.required(),
  time: time.required(),
  observations: observations,
  vehicleId: vehicleId.required().messages({
    "number.empty": "El Vehiculo no puede estar vacio",
  }),
  serviceId: serviceId.required().messages({
    "number.empty": "El Servicio no puede estar vacio",
  }),
});
const patchAppointmentState  = Joi.object({
  state : Joi.string(),
})
const patchAppointment = Joi.object({
  date: date,
  time: time,
  observations: observations,
  amount: amount,
  vehicleId: vehicleId,
  serviceId: serviceId,
  state: Joi.string(),
});
const patchAppointmentParams = Joi.object({
  id: Joi.number().integer(),
});
const getAbilitySchema = Joi.object({
  id: id.required().messages({
    "number.empty": "El Id no puede estar vacio",
  }),
  date: date.required().messages({
    "string.base": "La fecha debe ser una cadena de texto.",
    "date.isoDate": "La fecha debe tener un formato ISO 8601 válido.",
  }),
});

const getByQuery = Joi.object({
  limit: Joi.string(),
  offset: Joi.string(),
  state: Joi.string(),
  plate: Joi.string(),
date : Joi.date()
});
const getByDate = Joi.object({
  date: date.required().messages({
    "string.base": "La fecha debe ser una cadena de texto.",
    "date.isoDate": "La fecha debe tener un formato ISO 8601 válido.",
  }),
});

module.exports = {
  getByDate,
  getAbilitySchema,
  createAppointmentSchema,
  getByQuery,
  patchAppointmentParams,
  patchAppointment,
  patchAppointmentState
};
