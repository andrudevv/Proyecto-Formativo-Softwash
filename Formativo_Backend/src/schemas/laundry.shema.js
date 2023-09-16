import Joi from 'joi';

const id = Joi.number().integer();
const rutLaundry = Joi.number().integer();
const name = Joi.string();
const address = Joi.string();
const phone = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const departmentId = Joi.number().integer();
const membership = Joi.boolean();
const ability = Joi.number().integer();
const municipalityId = Joi.number().integer();



const createLaundrySchema = Joi.object({
    rutLaundry: rutLaundry.required(),
    name: name.required(),
    address: address.required(),
    phone: phone.required(),
    email: email.required(),
    password: password.required(),
    ability: ability,
    departmentId : departmentId.required(),
    municipalityId: municipalityId.required(), 
    

})



const updateLaundrySchema = Joi.object({
    id: id.required(),
    name: name,
    address: address,
    phone: phone,
    email: email,
    password: password,
    membership : membership,
    departmentId: departmentId
})

const getLaundrySchema =Joi.object({
    id: id.required(),
});

const getLaundrysSchema = Joi.object({
    departmentId : departmentId.required(),
    municipalityId: municipalityId.required(), 
})


const loginLaundrySchema = Joi.object({
    email: email.required(),
    password: password.required()
})
export{createLaundrySchema, updateLaundrySchema, getLaundrySchema, loginLaundrySchema,getLaundrysSchema}