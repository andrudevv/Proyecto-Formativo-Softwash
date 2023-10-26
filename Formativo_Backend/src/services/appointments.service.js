import { Sequelize } from "sequelize";
import { Appointment, Service , Laundry} from "../db/models/index.js";

class AppointmentService {
  constructor() {}

  //   async findAllsWhere(dep, mun) {
  //     const where = await Appointment.findAll({
  //       where: { department_id: dep, municipalityId: mun },
  //     });

  //     if (!where) {
  //       throw new Error("lavaderos no encontrados");
  //     }
  //     return where;
  //   }
  //   async findOne(id) {
  //     const Appointment = await Appointment.findOne(id);

  //     if (!Appointment) {
  //       throw new Error("correo no encontrado");
  //     }
  //     return Appointment;
  //   }

  //   async login(rutLaundry, email, password) {
  //     const laundry = await Appointment.findOne({where : {email:email, rutLaundry:rutLaundry}});
  //     const isPasswordValid = bcrypt.compareSync(password, laundry.password);
  //     if(!laundry || !isPasswordValid){
  //       throw new Error('Rut, Correo o contraseña incorrectos ');
  //     }
  //     return laundry;
  //   }
  //   async regiterClient(body) {
  //     const laundryFound = await Appointment.findOne({ where: { email: body.email , rutLaundry: body.rutLaundry } });
  //     if (laundryFound) {
  //       throw new Error("El correo electrónico o Rut ya existe");
  //     }
  //     const passwordHash = await bcrypt.hash(body.password, 10);
  //     const newLaundry = await Appointment.create(
  //         {
  //         ...body,
  //         password: passwordHash,
  //     });
  //     delete newLaundry.dataValues.password;
  //     return newLaundry;
  //   }

  async saveAppointment(dt) {
    const searchAbility = await Appointment.findOne({
      attributes: [
        "time",
        [Sequelize.fn("COUNT", Sequelize.col("time")), "count"],
      ],
      where: {
        time: dt.time, // Fecha específica
      },
      group: ["time"],
      having: Sequelize.literal("count <= 1"),
    });
    if (searchAbility) {
      console.log("hay disponibilidad");
    } else {
      console.log("no hay disponibilidad");
    }
    const date = await Appointment.create(dt);
    console.log(date);
    return date;
  }
  async findAppointments(id){
    const findAppointment = await Appointment.findAll({where: {serviceId: id }});
    return findAppointment;
  }

  async findApp(id){
    const app=await Appointment.findAll({
      include: [
        {
          model: Service,
          include: [
            {
              model: Laundry,
              where: {
                id: id, // Filtra por el ID del lavadero
              },
            },
          ],
        },
      ],
    });
    return app;
  }
  async findTime(hora){
    const searchAbility = await Appointment.findAll({
      attributes: [
        "time",
        [Sequelize.fn("COUNT", Sequelize.col("time")), "cantidad"],
      ],
      where: {
        time: [hora], // Fecha específica
      },
      group: ["time"],
      // having: Sequelize.literal("count(time) <= 1"),
    });
    const objTime = searchAbility[0];
    if(objTime.dataValues.cantidad <= 2){
      console.log('cantidad 2');
    }else{
      console.log('mas de 2');
    }
    const resultados = searchAbility.map(cita => ({
      hora: cita.dataValues.time,
      cantidad: cita.dataValues.cantidad,
    }));
    console.log(resultados);
  }
  async findAbility(dt,hora) {
    // const searchAbility = await Appointment.findAll({
    //   attributes: [
    //     "time",
    //     [Sequelize.fn("COUNT", Sequelize.col("time")), "cantidad"],
    //   ],
    //   where: {
    //     time: [hora], // Fecha específica
    //   },
    //   group: ["time"],
    //   // having: Sequelize.literal("count(time) <= 1"),
    // });
    // const objTime = searchAbility[0];
    // if(objTime.dataValues.cantidad <= 2){
    //   console.log('cantidad 2');
    // }else{
    //   console.log('mas de 2');
    // }
    // const resultados = searchAbility.map(cita => ({
    //   hora: cita.dataValues.time,
    //   cantidad: cita.dataValues.cantidad,
    // }));
    // console.log(resultados);

    const findhour= await this.findTime(hora)
    console.log(findhour);
    const find = await Appointment.findAll({ where: { date: dt } });
    if (!find) return console.log("no hay citas asignadas");
    return { find };
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
export default AppointmentService;
