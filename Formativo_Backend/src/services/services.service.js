const { Service, Laundry, Appointment } = require("../db/models/index.js");

class Services {
  constructor() {}

  // async createService(data) {
  //   const newService = await Service.create(data);
  //   return newService;
  // }

  async findServices(id, query) {
    const options = {
      attributes: { exclude: ["createdAt"] },
      where: { laundryId: id },
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * offset);
    }

    const { typeVehicles } = query;
    if (typeVehicles) {
      options.where.typeVehicles = typeVehicles;
    }

    const serviceFound = await Service.findAll(options);
    if (serviceFound.length === 0) {
      serviceFound[0] = "No se encontraron coincidencias";
    }
    return { services: serviceFound };
  }

  //servicio para el lavadero crear sericios
  async findAndCreate(id, body) {
    const findLaundry = await Laundry.findOne({ where: { id: id } });
    if (!findLaundry) {
      throw new Error("lavadero no encontrado ");
    }
    const newService = await Service.create({
      ...body,
      laundryId: id,
    });
    if (!newService) {
      throw new Error("error al crear el servicio");
    }
    return { message: "Servicio creado con exito", create: true };
  }

  async findServicesLaundry(id, query) {
    const options = {
      where: { laundry_id: id },
    }
    const {offset, limit = 10} = query;
    if (offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * offset);
    }
    const findServices = await Service.findAll(options);
    
    return findServices;
  }

  async updateService(idService, idClient, changes) {
    const findService = await Service.findOne({ where: { id: idService } });
    if (!findService) {
      throw new Error("no se encontro el servicio");
    }
    const [updateService] = await Service.update(changes, {
      where: { id: idService, laundryId: idClient },
    });
    if (updateService === 0) {
      throw new Error("no hay datos para actualizar");
    }

    return { message: "Servicio actualizado ", update: true };
  }

  async deleteService(idService, idClient) {
    const findService = await Service.findOne({
      attributes: ["id"],
      where: { id: idService, laundryId: idClient },
    });
    if (!findService) {
      throw new Error("no se encontro el servicio");
    }
    const findserviceWithAppointment = await Appointment.findOne({
      where: { serviceId : findService.id}
    })
    if(findserviceWithAppointment){
      throw new Error('No puede eliminar el servicio, tiene citas pendientes con el servicio');
    }

    const deleted = await Service.destroy({
      where: { id: findService.dataValues.id },
    });
    if (deleted === 0) {
      throw new Error("No se pudo eliminar el servicio");
    }
    return { message: "Servicio eliminado exitosamente ", deleted: true };
  }
  // async find(query) {
  //   const options = {
  //     include: ["category"],
  //     where: {},
  //   };
  //   const { limit, offset } = query;
  //   if (limit && offset) {
  //     options.limit = limit;
  //     options.offset = offset;
  //   }

  //   const { price } = query;
  //   if (price) {
  //     options.where.price = price;
  //   }

  //   const { price_min, price_max } = query;
  //   if (price_min && price_max) {
  //     options.where.price = {
  //       [Op.gte]: price_min,
  //       [Op.lte]: price_max,
  //     };
  //   }
  //   const products = await Service.findAll(options);
  //   return products;
  // }

  async findOne(id) {
    const service = Service.find((item) => item.id === id);
    if (!service) {
      throw new Error("servicio no encontrado");
    }
    return service;
  }

  async update(id, changes) {
    const [updated] = await Service.update(changes, {
      where: { id },
    });
    if (updated) {
      const updatedService = await Service.findByPk(id);
      return updatedService;
    }
    throw new Error("Servicio no encontrado");
  }

  async delete(id) {
    const deleted = await Service.destroy({
      where: { id },
    });
    if (deleted) {
      return { id };
    }
    throw new Error("Servicio no encontrado");
  }
}
module.exports = Services;
