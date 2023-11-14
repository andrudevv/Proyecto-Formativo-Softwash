
const Joi = require('joi');


const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.number().integer();
const tipeEmployee = Joi.number().integer();



const createEmployeeShema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    tipeEmployee: tipeEmployee.required()
})



const updateEmployeeShema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    tipeEmployee: tipeEmployee
})


module.exports ={createEmployeeShema, updateEmployeeShema}
