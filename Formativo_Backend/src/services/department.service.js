import { Department } from "../db/models/index.js";


class DepartmentService {

    constructor() {}
  
    async find() {
      const rta = await Department.findAll();
      return rta;
    }
  
    async findOne(id) {
      const dep = await Department.findByPk(id);
      if (!dep) {
        throw new Error('departamento no encontrado');
      }
      return dep;
    }
  
    async create(data) {
      
      const newDep = await Department.create(data);
      
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
  
export {DepartmentService};
  