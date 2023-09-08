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
    email: email.required().messages({
        'string.email': 'Debe proporcionar una dirección de correo electrónico válida',
        'any.required': 'El campo "email" es obligatorio',
    }),
    password: password.required().messages({'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'any.required': 'El campo "password" es obligatorio',}),
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