import { createError } from "http-errors";
import { setUpModels } from "../lib/sequelize.js";

class Services {
  constructor() {}

  async create(data) {
    const newService = await setUpModels.Service.create(data);
    return newService;
  }

  async find(query) {
    const options = {
      include: ["category"],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await setUpModels.Service.findAll(options);
    return products;
  }

  async findOne(id) {
    const service = setUpModels.Service.find((item) => item.id === id);
    if (!service) {
      throw createError(404, "servicio no encontrado");
    }
    return service;
  }

  async update(id, changes) {
    const [updated] = await setUpModels.Service.update(changes, {
      where: { id },
    });
    if (updated) {
      const updatedService = await setUpModels.Service.findByPk(id);
      return updatedService;
    }
    throw createError(404, "Servicio no encontrado");
  }

  async delete(id) {
    const deleted = await setUpModels.Service.destroy({
      where: { id },
    });
    if (deleted) {
      return { id };
    }
    throw createError(404, "Servicio no encontrado");
  }
}
 export {Services}