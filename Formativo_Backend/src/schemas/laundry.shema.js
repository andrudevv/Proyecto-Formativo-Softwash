import Joi from 'joi';

const id = Joi.number().integer();
const rutLaundry = Joi.number().integer();
const name = Joi.string();
const address = Joi.string();
const phone = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const departmentId = Joi.string();
const membership = Joi.boolean();


const createLaundryShema = Joi.object({
    rutLaundry: rutLaundry.required(),
    name: name.required(),
    address: address.required(),
    phone: phone.required(),
    email: email.required(),
    password: password.required(),
    departmentId: Joi.object({
        departament : departmentId.required()
    })

})



const updateLaundryShema = Joi.object({
    id: id.required(),
    name: name,
    address: address,
    phone: phone,
    email: email,
    password: password,
    membership : membership,
    departmentId: departmentId
})

const getLaundryShema =Joi.object({
    id: id.required(),
});


const loginLaundryShema = Joi.object({
    email: email.required(),
    password: password.required()
})
export{createLaundryShema, updateLaundryShema, getLaundryShema, loginLaundryShema}