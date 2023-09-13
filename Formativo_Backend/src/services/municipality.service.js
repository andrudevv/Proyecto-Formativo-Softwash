import { models} from "../lib/sequelize.js";
import { createError } from "http-errors";
class Municipality {

    constructor() {}
  
    async find() {
      const rta = await models.Municipality.findAll({
        include: ['Department']
      });
      return rta;
    }
  
    async findOne(id) {
      const dep = await models.Municipality.findByPk(id);
      if (!dep) {
        throw createError(404,'municipio no encontrado');
      }
      return dep;
    }
  
    async create(data) {
      
      const newMun = await models.Municipality.create(data, {
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
  
export {Municipality};
  