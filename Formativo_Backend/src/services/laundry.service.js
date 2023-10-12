import bcrypt from "bcryptjs";
import { Laundry } from "../db/models/index.js";

class LaundryService {
  constructor() {}

  async findAllsWhere(dep, mun) {
    const where = await Laundry.findAll({
      where: { department_id: dep, municipalityId: mun },
    });

    if (!where) {
      throw new Error("lavaderos no encontrados");
    }
    return where;
  }
  async findOne(id) {
    const Laundry = await Laundry.findOne(id);

    if (!Laundry) {
      throw new Error("correo no encontrado");
    }
    return Laundry;
  }

  async login(rutLaundry, email, password) {
    const laundry = await Laundry.findOne({where : {email:email, rutLaundry:rutLaundry}});
    const isPasswordValid = bcrypt.compareSync(password, laundry.password);
    if(!laundry || !isPasswordValid){
      throw new Error('Rut, Correo o contraseña incorrectos ');
    }
    return laundry;
  }
  async regiterClient(body) {
    const laundryFound = await Laundry.findOne({ where: { email: body.email , rutLaundry: body.rutLaundry } });
    if (laundryFound) {
      throw new Error("El correo electrónico o Rut ya existe");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newLaundry = await Laundry.create(
        {
        ...body,
        password: passwordHash,
    });
    delete newLaundry.dataValues.password;
    return newLaundry;
  }

  async update(id, changes) {
    const laundry = await this.findOne(id);
    const rta = await laundry.update(changes);
    return rta;
  }
  async delete(id) {
    const laundry = await this.findOne(id);
    await laundry.destroy();
    return { rta: true };
  }
}
export default LaundryService;
