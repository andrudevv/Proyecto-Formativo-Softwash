
const {Employee} = require('../db/models/index.js');


class Employee {

    constructor(){

    }

    async create(data) {
        const newEmpleado = await Employee.create(data);
        return newEmpleado;
      }
    
      async find() {
        const empleados = await Employee.findAll();
        return empleados;
      }
    
      async findOneEmpleado(id) {
        const empleado = await Employee.findByPk(id);
        return empleado;
      }
    
      async update(id, changes) {
        const [updated] = await Employee.update(changes, {
          where: { id }
        });
        if (updated) {
          const updatedEmpleado = await Employee.findByPk(id);
          return updatedEmpleado;
        }
        throw createError(404,'Empleado no encontrado');
      }
    
      async delete(id) {
        const deleted = await Employee.destroy({
          where: { id }
        });
        if (deleted) {
          return { id };
        }
        throw createError(404,'Empleado no encontrado');
      }


}

module.exports =Employee;