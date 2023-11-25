const { Sequelize } = require("sequelize");
const {
  Appointment,
  Service,
  Laundry,
  Vehicle,
  User,
} = require("../db/models/index.js");
class AppointmentService {
  constructor() {}

  async getCitas(date) {
    const rta = await Appointment.findAll({
      attributes: ["date", "time"],
      include: [
        {
          model: Vehicle,
          attributes: ["plate"],
          include: [
            {
              model: User,
              attributes: ["email"],
              as: "User",
            },
          ],
        },
      ],
      where: { date: date },
    });

    return rta;
  }

  // antes de crear la cita verifica que haya disponibilidad, tambien antes de actualizar
  async search(dt, user) {
    try {
      
      const validateUser = await Vehicle.findOne({
        where: { userId: user, id: dt.vehicleId },
      });
      if (!validateUser) {
        throw new Error("No tiene permiso para reservar  en este vehiculo");
      }
      
      const findLimit = await this.findLimitLaundry(dt.serviceId);
      if (!findLimit || !findLimit.findLaundryByService.dataValues) {
        return { message: "Lavadero no encontrado." };
      }
      const lId = findLimit.findLaundryByService.dataValues.id;
      const searchAbility = await Appointment.findAll({
        attributes: [
          "time",
          [Sequelize.fn("COUNT", Sequelize.col("time")), "cantidad"],
        ],
        include: [
          {
            model: Service,
            attributes: [],
            where: { laundryId: lId },
          },
        ],
        where: {
          date: dt.date, // Fecha específica
          time: dt.time,
        },
        group: ["time"],
      });
      const ability = findLimit.findLaundryByService.dataValues.ability;
      const cantidad = searchAbility[0].dataValues.cantidad;
      if (searchAbility.length === 0) {
        return true;
      } else {
        if (cantidad < ability) {
          return true;
        } else {
          throw new Error("Excede el limite de citas permitido");
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //servicio para verificar la cita antes de crear o actualizar
  async saveAppointment(data, user) {
    const existingAppointment = await Appointment.findOne({
      where: {
        vehicleId: data.vehicleId,
        serviceId: data.serviceId,
      },
    });
    if (existingAppointment && existingAppointment.state === "pendiente") {
      throw new Error(
        "No puedes agendar esta cita porque ya hay una cita pendiente para este vehículo y servicio."
      );
    }
    const canregister =  await  this.search(data, user);
    if(!canregister){
      throw new Error("Error al guardar");
    }
    const save = await Appointment.create(data);
    if (save[0] === 0) {
      throw new Error("Error al guardar");
    }
    return { message: "Cita agendada con exito", save };
  }

  // servicio para que el usuario busque las citas que tiene agendadas en cualquier lavadero
  async findMyAppointments(id) {
    const findAppointments = await Appointment.findAll({
      attributes: { exclude: ["createdAt"] },
      include: [
        {
          model: Vehicle,
          attributes: ["plate"],
          where: { userId: id },
        },
        {
          model: Service,
          attributes:["name"],
          include:[
            {
              model:Laundry,
              attributes:["address"],
            }
          ]

        },
      ],
    });
    
    return findAppointments ;
  }

  // buscar la disponibilidad y id de lavadero por medio de un servicio para crear o actualizar citas
  async findLimitLaundry(id) {
    const findLimitByService = await Service.findOne({
      attributes: ["id", "laundryId"],
      where: { id: id },
    });
    if (!findLimitByService) {
      throw new Error("Servicio no encontrado");
    }
    const findLaundryByService = await Laundry.findOne({
      attributes: ["id", "ability"],
      where: { id: findLimitByService.dataValues.laundryId },
    });
    if (!findLaundryByService) {
      throw new Error("Lavadero no encontrado");
    }
    return { findLaundryByService };
  }

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

  // servicio para el propio lavadero que retornara los servicios que tiene segun la fecha () añadir estado
  async findAllAppointments(id, date, query) {
    const options = {
      include: [
        {
          model: Service,
          attributes: [],
          include: [
            {
              model: Laundry,
              attributes: [],
              where: { id: id },
            },
          ],
        },
      ],
      where: {
        date: date,
      },
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * offset);
    }

    const findAppointments = await Appointment.findAll(options);

    if (findAppointments.length === 0) {
      throw new Error("No tienes citas para esta fecha");
    }

    return { Appointments: findAppointments };
  }

  // disponibilidad segun lavadero (pendiente)
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

  // una parte de buscar disponibilidad junto con el otro servicio findAllAvilityByDate
  async findAbilityByService(idService, dt) {
    const findByService = await Service.findOne({ where: { id: idService } });
    if (!findByService) {
      throw new Error("Servicio no encontrado");
    }
    const findLaundry = await Laundry.findOne({
      where: { id: findByService.dataValues.laundryId },
    });
    if (!findLaundry) {
      throw new Error("Lavadero no encontrado");
    }
    const hours = await this.findAllAbilityByDate(
      findLaundry.dataValues.id,
      dt
    );

   const ability = {"ability": findLaundry.dataValues.ability,
  "aperture": findLaundry.dataValues.aperture,
"closing": findLaundry.dataValues.closing}
    
    
    return  {hours, ability} ;
  }
  // una parte de buscar disponibilidad junto con findAbilityByService
  async findAllAbilityByDate(id, date) {
    const availability = await Appointment.findAll({
      attributes: [
        "time",
        [Sequelize.fn("COUNT", Sequelize.col("time")), "cantidad"],
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
      where: { date: date },
      group: ["time"],
    });
    return availability;
  }

  //servicio para actualizar la cita del lado del usuario
  async updateMyAppointment(user, id, changes) {
    const appointmentUser = await Appointment.findOne({
      where:{id:id}
    });
    if (!appointmentUser) {
      throw new Error("No se encontro la cita");
    }
    this.search(changes,user)


    const updateAppointment = await Appointment.update(changes, {
      
      where: { id: id },
    });
    console.log(updateAppointment);
    if (updateAppointment[0] === 0) {
      throw new Error("No hay datos para actualizar");
    }

    return { message: "Cita actualizada correctamente", update: true };
  }

  async delete(id) {
    const laundry = await this.findOne(id);
    await laundry.destroy();
    return { rta: true };
  }
}
module.exports = AppointmentService;
