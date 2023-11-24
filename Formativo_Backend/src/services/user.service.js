
const bcrypt = require('bcryptjs');
const {User, Municipality} = require('../db/models/index.js');
const {createAccessToken} = require('../lib/jwt.js');
const sendEmailForgot = require('../utils/userResetPassword.js');
const {verifyToken} = require('../lib/jwt.js');

// const MunicipalityService = require('../services/municipality.service.js')

// const municipality = new MunicipalityService();

class UserService {
  constructor() {}
  //Ruta registro para el usuario
  async registerUser(body) {
    const userFound = await User.findOne({ where: { email: body.email } });
    if (userFound) {
      throw new Error("El correo electrónico ya existe");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newUser = await User.create({
      ...body,
      password: passwordHash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async findByEmail(email) {
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      throw new Error("El correo electrónico no existe");
    }
    return userFound;
  }

  // servicio de inicio de sesion
  async login(email, password) {
    const user = await User.findOne({
      attributes:{exclude: ['recoveryToken']},
      // include:{
      //   model:Municipality,
      //   as: "Municipality",
      // },
       where: { email: email } });
    // en caso de querer mostrar el error en especifico de cada campo se habilitan estos condicionales, la siguiente que esta habilitada es para mayor seguridad sin confirmar el campo erroneo , exigiendo al usuario su atencion en los datos ingresados
    if (!user) {
      throw new Error("El correo electrónico no existe");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.dataValues.password);
    // if (!isPasswordValid) {
    //   throw new Error("Contraseña incorrecta");
    // }
    if (!user || !isPasswordValid) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    delete user.dataValues.password;
    return user;
  }


  async findProfile(id){
    
    const findUser = await User.findOne({
      attributes:{exclude:['password','role','recoveryToken']},
      include:{
        model:Municipality,
        as: "Municipality",
      },
      where:{id:id}});
    if (!findUser) {
      throw new Error("usuario no encontrado");
    }
    // const findC= await municipality.findName(findUser.municipalityId);
    // if (!findC) {
    //   throw new Error("municipio no encontrado");
    // }
    // findUser.municipalityId = findC;
    
    return findUser
    
  }

  async sendEmailForgot(email) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("El correo electrónico no existe");
    }
    const token = await createAccessToken({
      id: user.id,
      documentUser: user.documentUser,
      username: user.name,
      role: user.role,
    });
    const updateRecovery = await User.update(
      { recoveryToken: token }, 
      { where: { id: user.id } } 
      );
    if(updateRecovery[0] === 1){
      const sendEmail = sendEmailForgot(email, token);
      if(!sendEmail){
        throw new Error('Error al enviar el correo de recuperacion');
      }

    }
    return { message: `Se ha enviado un correo de recuperación al correo: ${email}` }
  }

//servicio para cambiar la contraseña por medio de token enviado al correo
  async changePassword(token, newPassword){
    try {
      const payload = verifyToken(token);
      const user = await User.findByPk(payload.id);
      if (user.recoveryToken !== token) {
        throw new Error('no autorizado')
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await User.update({recoveryToken: null, password: hash},{where : {id: user.id}});
      return { message: 'contraseña actualizada' };
    } catch (error) {
      throw new Error('no autorizado')
    }
  }


  async findOne(id) {
    const user = await User.findOne({
      attributes:{exclude: ['recoveryToken','password']},
      include:{
        model:Municipality,
        as: "Municipality",
      },
      where: {id:id}});
    if (!user) {
      throw new Error("usuario no encontrado");
    }
    return user;
  }
 

  //servicio para actualziar datos
  async updateUser(id, changes) {
    const user = await User.findOne({where:{id: id}});
    if (!user) {
      throw new Error("El usuario no existe");
    }
    if(user.dataValues.email !== changes.email){
      const existingEmail = User.findOne({
        where:{email:changes.email}
      })

      if(existingEmail){
        throw new Error('Correo electronico en uso');
      }
    }else{
      delete changes.email;
    }
    const [Update] = await User.update(changes,{
      where: {id :id}
    });
    if (Update === 0) {
      throw new Error("no hay datos para actualizar");
    } 
    return {message: "Actualizacion exitosa", update:true};
  }


}

module.exports =UserService;
