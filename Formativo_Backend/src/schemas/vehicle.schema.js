import Joi from 'joi';


const plate = Joi.string();
const model = Joi.number().integer();
const color = Joi.string();
const userId = Joi.number().integer();
const typeVehicle =  Joi.string();


const getVehivleSchema = Joi.object({
    plate: plate.required(),
  });

const createVehicleShema = Joi.object({
    plate: plate.required(),
    model: model.required(),
    color: color.required(),
    userId: userId.required(),
    typeVehicle: typeVehicle.required()
})



const updateVehicleShema = Joi.object({
    plate: plate,
    model: model,
    color: color,
    typeVehicle: typeVehicle
})


export{createVehicleShema, updateVehicleShema,getVehivleSchema}
