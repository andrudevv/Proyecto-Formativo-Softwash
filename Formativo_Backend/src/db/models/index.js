import {User, UserShema} from './user.model.js';



function setUpModels (sequelize){
    User.init(UserShema, User.config(sequelize));


    // Customer.associate(sequelize.models)
}
export {setUpModels,User}