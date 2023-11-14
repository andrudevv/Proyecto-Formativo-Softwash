
const {Type} = require('../db/models/index.js');


class TypeEmployeeService {
  constructor() {}
  async create(data) {
    const newType = await Type.create(data);
    return newType;
  }

  async find() {
    const type = await Type.findAll();
    return type;
  }

  async findOne(id) {
    const type = await Type.findByPk(id, {
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

module.exports = TypeEmployeeService ;
