const {User, UserSchema} = require('./user.models.js');
const { Appointment, AppointmentSchema } = require('./appointment.models.js');

const {Department, DepartamentSchema} =require('./department.models.js');
const { Employee, EmployeeSchema} = require('./employee.models.js')
const {Laundry, LaundrySchema} = require('./laundry.models.js');
const {Municipality , MunicipalitySchema} = require('./municipality.models.js');
const {Service, ServiceSchema} = require('./services.models.js');
const { Type, typeSchema} = require('./typeEmployee.models.js');
const {Vehicle, UserVehicleSchema} = require('./vehicle.models.js');



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
module.exports = {setUpModels, User, Appointment, Department, Employee, Laundry, Municipality ,Service, Type, Vehicle}