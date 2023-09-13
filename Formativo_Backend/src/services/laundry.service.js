
import { models} from "../lib/sequelize.js";
import { createError } from "http-errors";

class Laundry{
    constructor(){

    }

    async findOneWhere(dep, mun){
        const where = await models.Laundry.findAll({
            where:{dep, mun}
        })
        if(!where){
            throw createError(404,'lavaderos no encontrados')
        }
        return where
    }
    async find(){
        const rta = await models.Laundry.findAll();
        return rta
    }

    async findOne(id){
        const laundry = await models.Laundry.findByPk(id);
        if(!laundry){
            throw createError(404,'lavadero no encontrado')
        }
        return laundry;
    }

    async create(data){
        const newLaundry = await models.Laundry.create(data);
        return newLaundry;
    }

    async update(id, changes) {
        const laundry = await this.findOne(id);
        const rta = await laundry.update(changes);
        return rta;
      }
      async delete(id) {
        const laundry = await this.findOne(id);
        await laundry.destroy();
        return { rta: true };
      }

}
export {Laundry}