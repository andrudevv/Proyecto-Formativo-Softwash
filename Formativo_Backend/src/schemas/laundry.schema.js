import Joi from 'joi';

const customMessages = {
    "string.empty": "Este campo no puede estar vacío",
    "string.email": "Debes ingresar una dirección de correo electrónico válida",
    "any.required": "este campo es obligatorio",
    "number.max": "sobrepasa el maximo",
    "string.min":"contraseña minima de 6 caracteres",
    "number.empty":"este campo no puede estar vacio",
    "number.base":"este campo debe ser un numero"
  };
const id = Joi.number().integer();
const rutLaundry = Joi.number().integer();
const name = Joi.string();
const address = Joi.string();
const phone = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const departmentId = Joi.number().integer();
const municipalityId = Joi.number().integer();
const membership = Joi.boolean();
const ability = Joi.number().integer();
const aperture = Joi.string();
const closing = Joi.string();





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
    departmentId : departmentId.required(),
    municipalityId: municipalityId.required().messages({
        "number.empty":"este campo no puede estar vacio",
        "number.base":"Municipio' este campo debe seleccionarse"
    }), 
    

}).messages(customMessages);



const updateLaundrySchema = Joi.object({
    id: id.required(),
    name: name,
    address: address,
    phone: phone,
    email: email,
    password: password,
    membership : membership,
    departmentId: departmentId,
    ability: ability,
    aperture: aperture,
    closing: closing,
})

const getLaundrySchema =Joi.object({
    id: id.required(),
});

const getLaundrysSchema = Joi.object({
    departmentId : departmentId.required(),
    municipalityId: municipalityId.required(), 
})


const loginLaundrySchema = Joi.object({
    rutLaundry: rutLaundry.required(),
    email: email.required(),
    password: password.required()
})
export{createLaundrySchema, updateLaundrySchema, getLaundrySchema, loginLaundrySchema,getLaundrysSchema}