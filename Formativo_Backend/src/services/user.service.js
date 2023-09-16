// const { Boom } = require('@hapi/boom');
// import { data } from "autoprefixer";
import { User } from "../db/models/index.js";
import bcrypt from "bcryptjs";



class UserService {
  constructor() {}
//Ruta registro para el usuario
  async registerUser(body) {
    const userFound = await User.findOne({where : {email: body.email}});
    if (userFound) {
      throw new Error("El correo electrónico ya existe");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newUser = await User.create(
        {
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
    console.log(email);
    const userFound = await User.findByPk(email);
    if (!userFound) {
      throw new Error("El correo electrónico no existe");
    }
    return userFound;
  }



// servicio de inicio de sesion 
  async login(email, password) {
    const user = await User.findByPk(email);
    if (!user) {
      throw new Error("El correo electrónico no existe");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }
    return user;
  }


 



  async findOne(id) {
    const user = await User.findOne(id);

    if (!user) {
      // throw Boom.notFound('user not found');
      throw new Error("correo no encontrado");
    }
    return user;
  }
  
  async update(id, changes) {
    const user = await this.findOne(id);
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
