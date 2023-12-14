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

      if (!findLimit || !findLimit.dataValues) {
        return { message: "Lavadero no encontrado." };
      }
      const ability = findLimit.dataValues.ability;
      const lId = findLimit.dataValues.id;
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
      let cantidad = 0;
      if (searchAbility.length != 0) {
        cantidad = searchAbility[0].dataValues.cantidad;
      }

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
    if (existingAppointment && existingAppointment.state === "pendiente" || existingAppointment.state === "no asitió" ) {
      throw new Error(
        "No puedes agendar esta cita porque ya hay una cita pendiente para este vehículo y servicio."
      );
    }
    if(existingAppointment && existingAppointment.state === 'finalizado'){
      let updateData = {
        ...data,
        state:'pendiente'
      }
      const appointment= await Appointment.update(updateData,{where:{id:existingAppointment.id }});
      return { message: "Cita agendada con exito", appointment}
    }
    
    const canregister = await this.search(data, user);
    if (!canregister) {
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
          attributes: ["name"],
          include: [
            {
              model: Laundry,
              attributes: ["address"],
            },
          ],
        },
      ],
    });

    return findAppointments;
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
    return findLaundryByService;
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
          model: Vehicle,
          attributes: ["plate"],
        },
        {
          model: Service,
          attributes: ["name"],
          where: { laundryId: id },
          // include: [
          //   {
          //     model: Laundry,
          //     attributes: [],
          //     where: { id: id },
          //   },
          // ],
        },
      ],
      where: { date: date },
    };
    const { limit = 10, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * offset);
    }
    const { state } = query;
    if (state) {
      options.where.state = state ;
    }
   
    const findAppointments = await Appointment.findAll(options);

    return findAppointments;
  }
  async findAllAppointmentsAbsence(id, query) {
    const options = {
      include: [
        {
          model: Vehicle,
          attributes: ["plate"],
        },
        {
          model: Service,
          attributes: ["name"],
          where: { laundryId: id },
         
        },
      ],
      
    };

    const { date } = query;
    if (date) {
      options.where = {...options.where , date:date };
    }
    const { limit = 5, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * offset);
    }
    const { state } = query;
    if (state) {
      options.where =  {...options.where, state: state} ;
    }
    const { plate } = query;
    if (plate) {
      options.include[0].where = {plate: plate};
    }
    const findAppointments = await Appointment.findAll(options);
    return findAppointments;
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

    const ability = {
      ability: findLaundry.dataValues.ability,
      aperture: findLaundry.dataValues.aperture,
      closing: findLaundry.dataValues.closing,
    };

    return { hours, ability };
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
          where: { laundryId: id },
          // include: [
          //   {
          //     model: Laundry,
          //     attributes: [],
          //     where: {
          //       id: id, // Filtra por el ID del lavadero
          //     },
          //   },
          // ],
        },
      ],
      where: { date: date },
      group: ["time"],
    });
    return availability;
  }
  //ruta para encontrar cita y actualizarla
  async findAppointmentForReschedule(id, clientId) {
    const findAppointments = Appointment.findOne({
      include: [
        {
          model: Service,
          where: {
            laundryId: clientId,
          },
        },
      ],
      where: { id: id },
    });
    if (!findAppointments) {
      throw new Error("No se encontró la cita");
    }

    return findAppointments;
  }
//servicio para traer las citas que tiene el proceso y en el lavado
  async findProcessAppointments(id){
    
    const findProcess = await Appointment.findAll({
      include:[{
        model:Service,
        where: { laundryId: id}
      },
    {
      model: Vehicle,
    }],
      where:{
        state:'en proceso'
      }
    });

    return findProcess;

  }

  async updateMyAppointmentState(idAppointment, idClient, newState) {
    const findAppointment = await Appointment.findOne({
      include: [
        {
          model: Service,
          where: {
            laundryId: idClient,
          },
        },
      ],
      where: { id: idAppointment },
    });
    console.log(findAppointment);
    if (!findAppointment) {
      throw new Error("La cita no se encontró");
    }
    const [updateAppointment] = await Appointment.update(newState, {
      where: { id: idAppointment },
    });
    if (updateAppointment === 0) {
      throw new Error("Error al actualizar el estado de la cita");
    }
    console.log(updateAppointment);
    return true;
  }
  //servicio para actualizar la cita a finalizada
  async appointmentFinalized(id){
    const state = {state:'finalizado'};
    const updateA = await Appointment.update(state,{
      where: {id: id}
    })
    if(updateA=== 0){
      throw new Error('error al actualizar')
    }
    return true
  }
  //servicio para actualizar la cita con todos los datos
  async rescheduleAppointment(idAppointment, idClient, newData) {
    const options = {
      include: [
        {
          model: Service,
          where: { laundryId: idClient },
        },
      ],
      where: { id: idAppointment },
    };
    const find = Appointment.findOne(options);
    if (!find) {
      throw new Error("No se encontro la cita");
    }
    const [updateAppointment] = await Appointment.update(newData, options);
    if (updateAppointment === 0) {
      throw new Error("Error al actualizar la cita");
    }
    return true;
  }
  async deleteAppointment(idAppointment, idClient){
    const options = {
      include: [{
        model: Service,
        where: { laundryId: idClient },
      }],
      where: { id: idAppointment }
    }
    const deleted = Appointment.findOne(options)
    if(!deleted){
      throw new Error('No se encontro la cita');
    }
    const deleteAppointment = await Appointment.destroy(options)
    if(deleteAppointment === 0){
      throw new Error('No se pudo eliminar la cita');
    }
    return true;
  }
  async delete(id) {
    const laundry = await this.findOne(id);
    await laundry.destroy();
    return { rta: true };
  }
}
module.exports = AppointmentService;
