const bcrypt = require("bcryptjs");
const { verifyToken } = require("../lib/jwt.js");
const { createAccessToken } = require("../lib/jwt.js");
const sendEmailForgot = require("../utils/clientResetPassword.js");
const { Laundry, Municipality, Service, User } = require("../db/models/index.js");
const MunicipalityService = require("../services/municipality.service.js");
const { query } = require("express");
const municipality = new MunicipalityService();
class LaundryService {
  constructor() {}
  // consulta para traer todos los lavaderos segun departamento y ciudad
  async findAllsWhere(query) {
   
    const options = {
      attributes: [
        "id",
        "name",
        "address",
        "phone",
        "aperture",
        "closing",
        "rutLaundry",
        "municipalityId",
        "imageUrl"
      ],
      include: {
        model: Municipality,
      },
      where: { membership: true },
    };

    const { department } = query;
    if (department) {
      options.include = [
        {
          model: Municipality,
          where: { departmentId: parseInt(department) },
        },
      ];
    }
    const { municipality } = query;
    if (municipality) {
      options.where = { ...options.where, municipalityId: municipality };
    }

    const { typeVehicles } = query;
    if (typeVehicles) {
      options.include = [
        {
          model: Service,
          attributes: [],
          where: { typeVehicles: typeVehicles },
        },
      ];
    }
    const { offset, limit = 5 } = query;
    if (offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * offset);
    }


    const where = await Laundry.findAll(options);

    if (where.length === 0) {
      throw new Error("No se encontraron Lavaderos");
    }
    return where;
  }
  async findProfile(id) {
    const findLaundry = await Laundry.findOne({
      attributes: {
        exclude: ["password", "membership", "recoveryToken"],
      },
      where: { id: id },
    });
    if (!findLaundry) {
      throw new Error("lavadero no encontrado");
    }
    const findC = await municipality.findName(findLaundry.municipalityId);
    if (!findC) {
      throw new Error("ciudad no encontrado");
    }
    findLaundry.municipalityId = findC;
    return findLaundry;
  }

  //servicio para el verify , verifica los datos de las cookies para manipular frontend
  async findOne(id) {
    const findLaundry = await Laundry.findOne({ where: { id: id } });
    if (!findLaundry) {
      throw new Error("lavadero no encontrado ");
    }
    return findLaundry;
  }

  //servicio de usuario para ver el perfil del lavadero
  async findLaundry(id, query) {
    const options = {
      attributes: { exclude: ["password", "membership", "recoveryToken"] },
      include: [
        { model: Service },
        { model: Municipality },
      ],

      where: { id: id },
    };
    const { offset, limit = 5  } = query;
    if (offset) {
      options.include[0].limit = parseInt(limit);
      options.include[0].offset = parseInt(limit * offset);
    }
    const findLaundry = await Laundry.findOne(options);
    if (!findLaundry) {
      throw new Error("no se pudo obtener informacion del lavadero");
    }
    return findLaundry;
  }

  // servicio para iniciar sesion el cliente
  async login(rutLaundry, email, password) {
    const laundry = await Laundry.findOne({
      attributes: [
        "id",
        "rutLaundry",
        "name",
        "email",
        "password",
        "membership",
      ],
      where: { email: email, rutLaundry: rutLaundry },
    });

    if (!laundry) {
      throw new Error("No existe el lavadero");
    }
    if (!laundry.membership) {
      throw new Error(
        "No tiene membresia activa, por favor renueve la membresia o comunicarse con soporte"
      );
    }
    const isPasswordValid = bcrypt.compareSync(password, laundry.password);
    if (!laundry || !isPasswordValid) {
      throw new Error("Rut, Correo o contraseña incorrectos ");
    }
    delete laundry.dataValues.password;
    return laundry;
  }

  //servicio para registrarse el cliente
  async regiterClient(body) {
    const laundryFound = await Laundry.findOne({
      attributes: ["email", "id"],
      where: { email: body.email },
    });
    if (laundryFound) {
      throw new Error("El correo electrónico  ya existe");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newLaundry = await Laundry.create({
      ...body,
      password: passwordHash,
    });
    delete newLaundry.dataValues.password;
    return newLaundry;
  }

  //servicio para actualizar la imagen del lavadero
  async updateImgClient (id,img){
    const updateImg = Laundry.update(img,{where: {id: id}})
    if(!updateImg){
      throw new Error('error al actualizar la imagen')
    }
    return true
  }
  //servicio para que el cliente actualice sus datos excepto contraseña
  async updateClient(id, changes) {
    const laundry = await Laundry.findOne({
      attributes: ["email", "id"],
      where: { id: id },
    });
    if (!laundry) {
      throw new Error("El cliente no existe");
    }
    if (laundry.dataValues.email !== changes.email) {
      const existingEmail = await Laundry.findOne({
        where: { email: changes.email },
      });
      if (existingEmail) {
        throw new Error("Correo electronico en uso");
      }
    } else {
      delete changes.email;
    }

    const [update] = await Laundry.update(changes, {
      where: { id: id },
    });

    if (update === 0) {
      throw new Error("No hay datos para actualizar");
    }
    return { message: "Actualizacion exitosa", update: true };
  }

  //servicio para que el cliente recupere la contraseña en caso de olvidarla
  async sendEmailForgot(email) {
    const laundry = await Laundry.findOne({
      attributes: ["id", "rutLaundry", "name", "email", "recoveryToken"],
      where: { email: email },
    });
    if (!laundry) {
      throw new Error("El correo electrónico no existe");
    }
    const token = await createAccessToken({
      id: laundry.id,
      rutLaundry: laundry.rutLaundry,
      clientName: laundry.name,
    });
    const updateRecovery = await Laundry.update(
      { recoveryToken: token },
      { where: { id: laundry.id } }
    );
    if (updateRecovery[0] === 1) {
      const sendEmail = await sendEmailForgot(email, token);
      if (!sendEmail) {
        throw new Error("Error al enviar el correo de recuperacion");
      }
    }
    return {
      message: `Se ha enviado un correo de recuperación al correo: ${email}`,
    };
  }
  //servicio que permite cambiar la contraseña por medio de la recuperacion
  async changePassword(token, newPassword) {
    try {
      const payload = verifyToken(token);
      const laundry = await Laundry.findByPk(payload.id);
      if (laundry.recoveryToken !== token) {
        throw new Error("no autorizado");
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await Laundry.update(
        { recoveryToken: null, password: hash },
        { where: { id: laundry.id } }
      );
      return { message: "contraseña actualizada" };
    } catch (error) {
      throw new Error("no autorizado");
    }
  }
  //servicio para eliminar, por el momento no se usara
  async delete(id) {
    const laundry = await this.findOne(id);
    await laundry.destroy();
    return { rta: true };
  }
}
module.exports = LaundryService;
