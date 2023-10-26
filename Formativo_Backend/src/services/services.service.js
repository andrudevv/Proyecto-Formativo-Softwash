import { Service } from "../db/models/index.js";


class Services {
  constructor() {}

  async createService(data) {
    const newService = await Service.create(data);
    return newService;
  }

  async findServices(id){
    const serviceFound = await Service.findAll({where: {laundryId: id}});
    return serviceFound;
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
 export default Services;