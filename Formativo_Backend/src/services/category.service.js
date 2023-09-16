// import { setUpModels } from "../lib/sequelize.js";

import { Category } from "../db/models/index.js";

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await Category.findAll();
    return categories;
  }

  async findOne(nameC) {
    const categories = await Category.findOne({ where: { name: nameC } });
    return categories;
  }

  
  async findOneService(id) {
    const category = await Category.findByPk(id, {
      include: ["Services"],
    });
    return category;
  }
  // async findOneVehicle(id) {
  //   const category = await Category.findByPk(id, {
  //     include: ["Vehicles"],
  //   });
  //   return category;
  // }

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

export default CategoryService;
