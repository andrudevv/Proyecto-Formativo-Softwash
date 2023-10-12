import bcrypt from "bcryptjs";

import { User } from "../db/models/index.js";
import { createAccessToken } from "../lib/jwt.js";
import { sendEmailForgot } from "../utils/resetPassword.js";
import { verifyToken } from "../lib/jwt.js";
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

  async find() {
    const rta = await User.findAll();
    return rta;
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
    const user = await User.findOne({ where: { email: email } });
    // en caso de querer mostrar el error en especifico de cada campo se habilitan estos condicionales, la siguiente que esta habilitada es para mayor seguridad sin confirmar el campo erroneo , exigiendo al usuario su atencion en los datos ingresados
    // if (!user) {
    //   throw new Error("El correo electrónico no existe");
    // }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    // if (!isPasswordValid) {
    //   throw new Error("Contraseña incorrecta");
    // }
    if (!user || !isPasswordValid) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    return user;
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
    if(updateRecovery[0] === 1) return sendEmailForgot(email, token);
  }

 

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
    const user = await User.findOne(id);
    if (!user) {
      throw new Error("correo no encontrado");
    }
    return user;
  }

  async reset(token) {
    const user = await User.findOne({ where: { recoveryToken: token } });
    if (!user) {
      throw new Error("no existe el token");
    }
    return user;
  }
  async update(id, changes) {
    const user = await user.findOne(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }
    const rta = await user.update(changes);
    return rta;
  }
  async delete(id) {
    const user = await this.findOne(id);

    await user.destroy();
    return { id };
  }
}

export default UserService;
