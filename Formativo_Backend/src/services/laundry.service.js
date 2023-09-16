
import { Laundry } from "../db/models/index.js";



class LaundryService{
    constructor(){

    }

    async findAllsWhere(dep, mun){
        const where = await Laundry.findAll({
            where:{department_id: dep, municipalityId: mun}
        })
        
        if(!where){
            throw new Error('lavaderos no encontrados')
        }
        return where
    }
    async findOne(id) {
        const Laundry = await Laundry.findOne(id);
    
        if (!Laundry) {
          
          throw new Error("correo no encontrado");
        }
        return Laundry;
      }

    async findOne(id){
        const laundry = await Laundry.findByPk(id);
        if(!laundry){
            throw new Error('lavadero no encontrado')
        }
        return laundry;
    }

    async create(data){
        const userFound = await Laundry.findOne({where : {email: data.email}});
    if (userFound) {
      throw new Error("El correo electrónico ya existe");
    }
        const newLaundry = await Laundry.create(data);
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
export default LaundryService;