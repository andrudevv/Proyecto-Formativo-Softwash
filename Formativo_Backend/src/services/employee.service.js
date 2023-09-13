import { createError } from "http-errors";
import { models} from "../lib/sequelize.js";


class Employee {

    constructor(){

    }

    async create(data) {
        const newEmpleado = await models.Employee.create(data);
        return newEmpleado;
      }
    
      async find() {
        const empleados = await models.Employee.findAll();
        return empleados;
      }
    
      async findOneEmpleado(id) {
        const empleado = await models.Employee.findByPk(id);
        return empleado;
      }
    
      async update(id, changes) {
        const [updated] = await models.Employee.update(changes, {
          where: { id }
        });
        if (updated) {
          const updatedEmpleado = await models.Employee.findByPk(id);
          return updatedEmpleado;
        }
        throw createError(404,'Empleado no encontrado');
      }
    
      async delete(id) {
        const deleted = await models.Employee.destroy({
          where: { id }
        });
        if (deleted) {
          return { id };
        }
        throw createError(404,'Empleado no encontrado');
      }


}

export {Employee}