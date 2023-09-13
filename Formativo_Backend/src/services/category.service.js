
// import { setUpModels } from "../lib/sequelize.js";


class CategoryService {

    constructor(){
    }

    async create(data) {
        
      const newCategory = await setUpModels.Category.create(data);
      return newCategory;
    }
  
    async find() {
      const categories = await setUpModels.Category.findAll();
      return categories;
    }
  
    async findOneService(id) {
      const category = await setUpModels.Category.findByPk(id, {
        include: ['Service']
      });
      return category;
    }async findOneVehicle(id) {
        const category = await setUpModels.Category.findByPk(id, {
          include: ['Vehicle']
        });
        return category;
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

export default CategoryService;