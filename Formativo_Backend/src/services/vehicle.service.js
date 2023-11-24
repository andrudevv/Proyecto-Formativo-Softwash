const { Vehicle, User, Appointment } = require("../db/models/index.js");

class VehicleService {
  constructor() {}

  async create(data, id) {
    const findUser = await User.findOne({ where: { id: id } });
    if (!findUser) {
      throw new Error("Usuario no encontrado");
    }

    const newVehicle = await Vehicle.create(
      { 
        ...data,
        userId: id,
     });
    if (!newVehicle) {
      throw new Error("Error al crear un vehiculo");
    }
    return newVehicle;
  }


  async findVehicle(id) {
    const vehicle = await Vehicle.findAll({ 
      attributes:{exclude:['userId']},
      where: {userId:id } });
    if (vehicle.length === 0) {
      throw new Error("No tiene vehiculos creados");
    }
    return {vehicle};
  }
  async findOne(id) {
    const vehicle = await Vehicle.findOne({ where: { id: id } });
    if (!vehicle) {
      throw new Error("vehiculo no encontrado");
    }
    return vehicle;
  }

  async findAndUpdate(changes, id, idUser) {
    const vehicle = await Vehicle.findOne({
      where: {
        id: id,
        userId: idUser,
      },
    });
    if (!vehicle) {
      throw new Error("vehiculo no encontrado");
    }
    const [updateVehicle] = await Vehicle.update(changes, {
      where: {
        id: id,
        userId: idUser,
      },
    });
    if (updateVehicle  === 0) {
      throw new Error("no hay datos para actualizar");
    }
   
    return { message: "actualizado correctamente", update:true};
  }
  async findByUser(id) {
    const vehicle = await Vehicle.findAll({
      attributes: { exclude: ["userId"] },
      where: { userId: id },
    });
    if (!vehicle) {
      throw new Error("vehiculos de usuario no encontrados");
    }
    return vehicle;
  }


  async delete(user,id) {
    const vehicle = await Vehicle.findOne({where:{id:id,userId:user}})
    if(!vehicle){
      throw new Error('Vehiculo no encontrado')
    }
    const appointmentWithVehicle = Appointment.findOne({
      where: {vehicleId : vehicle.id}
    })
    if(appointmentWithVehicle){
      throw new Error('No puede eliminar el vehiculo, tiene cita pendiente')
    }
    const deleteV = await Vehicle.destroy({where:{id:id, userId:user}});
    if(!deleteV){
      throw new Error('Error al eliminar');
    }
    return { message: "Eliminado exitosamente", delete: true};
  }
}

module.exports = VehicleService;
