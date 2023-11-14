
const {Municipality} = require('../db/models/index.js');


class MunicipalityService {

    constructor() {}
  
    async find() {
      const rta = await Municipality.findAll({
        include: ['Department']
      });
      return rta;
    }
  
    async findOne(department) {
      const dep = await Municipality.findAll({where: {departmentId : department}});
      if (!dep) {
        throw new Error('municipio no encontrado');
      }
      return dep;
    }
    async findName(id) {
      const dep = await Municipality.findOne({where: { id: id}});
      if (!dep) {
        throw new Error('municipio no encontrado');
      }
      return dep;
    }
  
    async create(data) {
      
      const newMun = await Municipality.create(data, {
        include: ['Department']
      });
      
      return newMun;
    }
  
    async update(id, changes) {
      const mun = await this.findOne(id);
      const rta = await mun.update(changes);
      return rta;
    }
  
    async delete(id) {
      const mun = await this.findOne(id);
      await mun.destroy();
      return { rta: true };
    }
  
  }
  
  module.exports =MunicipalityService;
  