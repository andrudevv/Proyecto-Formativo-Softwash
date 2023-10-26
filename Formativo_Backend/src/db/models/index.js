import {User, UserSchema} from './user.model.js';
import { Appointment, AppointmentSchema } from './appointment.models.js' 
import {Department, DepartamentSchema} from './department.models.js'
import {Employee, EmployeeSchema} from './employee.model.js'
import { Laundry, LaundrySchema } from './laundry.models.js';
import {Municipality , MunicipalitySchema} from './municipality.models.js'
import {Service, ServiceSchema} from './services.models.js'
import { Type, typeSchema } from './typeEmployee.models.js';
import { Vehicle, UserVehicleSchema } from './vehicle.models.js';
function setUpModels (sequelize){
    User.init(UserSchema, User.config(sequelize));
    Appointment.init(AppointmentSchema, Appointment.config(sequelize));
    Department.init(DepartamentSchema, Department.config(sequelize));
    Employee.init(EmployeeSchema, Employee.config(sequelize));
    Laundry.init(LaundrySchema, Laundry.config(sequelize));
    Municipality.init(MunicipalitySchema, Municipality.config(sequelize));
    Service.init(ServiceSchema, Service.config(sequelize));
    Type.init(typeSchema, Type.config(sequelize));
    Vehicle.init(UserVehicleSchema, Vehicle.config(sequelize));

    // Customer.associate(sequelize.models)
    User.associate(sequelize.models);
    Appointment.associate(sequelize.models);
    Department.associate(sequelize.models);
    Employee.associate(sequelize.models);
    Laundry.associate(sequelize.models);
    Municipality.associate(sequelize.models);
    Service.associate(sequelize.models);
    Type.associate(sequelize.models);
    Vehicle.associate(sequelize.models);

    // ,Appointment, Category, Department, Employee, Laundry, Municipality ,Service, Type, Vehicle
}
export {setUpModels, User, Appointment, Department, Employee, Laundry, Municipality ,Service, Type, Vehicle}