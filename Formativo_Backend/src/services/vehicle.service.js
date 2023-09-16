import { Vehicle } from "../db/models/index.js";

import { createError } from "http-errors";


class VehicleService {
    constructor() {}
  
    async create(data) {
      const newVehicle = await Vehicle.create(data);
      return newVehicle;
    }
  
    async find() {
      const rta = await Vehicle.findAll({
        include: ['User']
      });
      return rta;
    }
  
    async findByPlate(plate) {
      const rta = await Vehicle.findOne({
        where: { plate }
      });
      return rta;
    }
  
    async findOne(id) {
      const vehicle = await Vehicle.findByPk(id);
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
  
export {VehicleService};
  