import { setUpModels } from "../lib/sequelize.js";

class TypeEmployee {
  constructor() {}
  async create(data) {
    const newType = await setUpModels.TypeEmployee.create(data);
    return newType;
  }

  async find() {
    const type = await setUpModels.TypeEmployee.findAll();
    return type;
  }

  async findOne(id) {
    const type = await setUpModels.TypeEmployee.findByPk(id, {
      include: ["Employee"],
    });
    return type;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

export { TypeEmployee };
