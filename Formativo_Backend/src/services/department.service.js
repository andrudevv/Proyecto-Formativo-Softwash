
const {Department} = require('../db/models/index.js');


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
    async findName(id) {
      const dep = await Department.findOne({where: { id:id}})
      if (!dep) {
        throw new Error('departamento no encontrado');
      }
      return dep;
    }
  
    
  
  }
  
  module.exports = DepartmentService;
  