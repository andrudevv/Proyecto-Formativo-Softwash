import Joi from 'joi';


const plate = Joi.string();
const model = Joi.string();
const color = Joi.number().integer();
const userId = Joi.number().integer();
const categoryId = Joi.number().integer();


const getVehivleSchema = Joi.object({
    plate: plate.required(),
  });

const createVehicleShema = Joi.object({
    plate: plate.required(),
    model: model.required(),
    color: color.required(),
    userId: userId.required(),
    categoryId: categoryId.required()
})



const updateVehicleShema = Joi.object({
    plate: plate,
    model: model,
    color: color,
    categoryId: categoryId
})


export{createVehicleShema, updateVehicleShema,getVehivleSchema}
