import Joi from 'joi';

// const id = Joi.number().integer();
const documentUser = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const token = Joi.string();
const city = Joi.string();
const municipality = Joi.string();


export const createuserShema = Joi.object({
    documentUser: documentUser.required(),
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    email: email.required(),
    password: password.required(),
    token: token,
    city: city.required(),
    municipality: municipality.required()
})



export const updateUserShema = Joi.object({
    email: email,
})

export const getUserShema =Joi.object({
    email: email.required(),
});


export const loginShema = Joi.object({
    email: email.required(),
    password: password.required()
})
// module.exports ={createuserShema, updateUserShema, getUserShema}