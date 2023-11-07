import { Sequelize } from "sequelize";
import { Appointment, Service, Laundry } from "../db/models/index.js";
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
    try {

      const existingAppointment = await Appointment.findOne({
        where: {
          vehicleId:dt.vehicleId,
          serviceId:dt.serviceId,
        },
      });
      if (existingAppointment && existingAppointment.state === 'pendiente') {
        console.log('No puedes agendar esta cita porque ya hay una cita pendiente para este vehículo y servicio.');
        throw new Error('No puedes agendar esta cita porque ya hay una cita pendiente para este vehículo y servicio.');
      }
      const searchAbility = await Appointment.findOne({
        attributes: [
          "time",
          [Sequelize.fn("COUNT", Sequelize.col("time")), "cantidad"],
        ],
        where: {
          time: dt.date, // Fecha específica
        },
        group: ["time"],
      });
      if(!searchAbility){
        const date = await Appointment.create(dt);
        console.log("Cita programada con éxito");
        return date;
      }else if(searchAbility && searchAbility.dataValues.cantidad >= 2){
        console.log("No hay disponibilidad para esta hora");
        throw new Error("No hay disponibilidad para esta hora, vuelve a buscar disponibilidad");
      }
     
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAppointments(id) {
    const findAppointment = await Appointment.findAll({
      where: { serviceId: id },
    });
    return findAppointment;
  }

  async findApp(id) {
    const app = await Appointment.findAll({
      attributes: [
        "id",
        "createdAt",
        "amount",
        "date",
        "time",
        "state",
        "observations",
        "vehicleId",
        "serviceId",
      ],
      include: [
        {
          model: Service,
          attributes: [],
          include: [
            {
              model: Laundry,
              attributes: [],
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
  async findTime(date, limitLaundry) {
    const searchAbility = await Appointment.findAll({
      attributes: [
        "time",
        [Sequelize.fn("COUNT", Sequelize.col("time")), "cantidad"],
      ],
      where: {
        date: date,
      },
      group: ["time"],
      // having: Sequelize.literal('cantidad <= 2'),
      having: Sequelize.literal(`cantidad <= ${limitLaundry}`), // Filtra para que la cantidad no sea mayor a 2
    });
    if (Array.isArray(searchAbility)) {
      if (searchAbility.length > 0) {
        const resultados = searchAbility.map((cita) => ({
          hora: cita.dataValues.time,
          cantidad: cita.dataValues.cantidad,
        }));
        return resultados;
      } else {
        throw new Error("No hay citas para este dia");
      }
    } else {
      // Puedes manejar otros tipos de errores si es necesario
      throw new Error("Error al buscar citas.");
    }
  }
  async findAbility(laundryid, dt) {
    const capacity = await Laundry.findByPk(laundryid);
    if (!capacity) {
      throw new Error("lavadero no encontrado");
    }

    const findhour = await this.findTime(dt, capacity.ability);
    if (findhour.length <= 0) {
      throw new Error("No hay horarios disponibles para este dia");
    }
    return findhour;

    // console.log("findhour",findhour);
    // const find = await Appointment.findAll({ where: { date: dt} });
    // if (!find) return console.log("no hay citas asignadas");
    // return { find };
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
