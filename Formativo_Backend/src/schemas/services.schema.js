import Joi from 'joi';


const id = Joi.number().integer();
const name = Joi.string();
const duraction = Joi.string();
const description = Joi.string();
const price = Joi.number().integer();
const categoryId = Joi.string();


const getServiceSchema = Joi.object({
    id: id.required(),
  });

const createServiceShema = Joi.object({
    name: name.required(),
    duraction: duraction.required(),
    description: description.required(),
    price: price.required(),
    categoryId: categoryId.required()
})



const updateServiceShema = Joi.object({
    name: name,
    duraction: duraction,
    description: description,
    price: price,
    categoryId: categoryId
})


export{getServiceSchema, createServiceShema,updateServiceShema}
