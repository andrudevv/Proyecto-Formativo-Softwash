import { models } from "../lib/sequelize.js";
import { createError } from "http-errors";


class Vehicle {
    constructor() {}
  
    async create(data) {
      const newVehicle = await models.Vehicle.create(data);
      return newVehicle;
    }
  
    async find() {
      const rta = await models.Vehicle.findAll({
        include: ['User']
      });
      return rta;
    }
  
    async findByPlate(plate) {
      const rta = await models.Vehicle.findOne({
        where: { plate }
      });
      return rta;
    }
  
    async findOne(id) {
      const vehicle = await models.Vehicle.findByPk(id);
      if (!vehicle) {
        throw createError(404,'vehiculo no encontrado');
      }
      return vehicle;
    }
  
    async update(id, changes) {
      const vehicle = await this.findOne(id);
      const rta = await vehicle.update(changes);
      return rta;
    }
  
    async delete(id) {
      const vehicle = await this.findOne(id);
      await vehicle.destroy();
      return { id };
    }
  }
  
export {Vehicle};
  