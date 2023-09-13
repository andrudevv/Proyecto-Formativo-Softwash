import { models} from "../lib/sequelize.js";
import { createError } from "http-errors";
class Department {

    constructor() {}
  
    async find() {
      const rta = await models.Department.findAll();
      return rta;
    }
  
    async findOne(id) {
      const dep = await models.Department.findByPk(id);
      if (!dep) {
        throw createError(404,'departamento no encontrado');
      }
      return dep;
    }
  
    async create(data) {
      
      const newDep = await models.Department.create(data);
      
      return newDep;
    }
  
    async update(id, changes) {
      const Dep = await this.findOne(id);
      const rta = await Dep.update(changes);
      return rta;
    }
  
    async delete(id) {
      const Dep = await this.findOne(id);
      await Dep.destroy();
      return { rta: true };
    }
  
  }
  
export {Department};
  