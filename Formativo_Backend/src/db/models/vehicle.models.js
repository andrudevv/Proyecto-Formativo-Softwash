const {Model, DataTypes} = require('sequelize');
const {USER_TABLE} = require('./user.models.js');
const VEHICLE_TABLE = "vehicles";

const UserVehicleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  // placa
  plate: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  typeVehicle: {
    allowNull: false,
    type: DataTypes.STRING,
  }
  // createAt:{
  //     allowNull: false,
  //     type: DataTypes.DATE,
  //     field: 'create_at',
  //     defaultValue: Sequelize.NOW
  // }
};

class Vehicle extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey:"userId",as: 'User' });
    this.belongsToMany(models.Service, {
      as: 'Service',
      through: models.Appointment, // Tabla puente
      foreignKey: 'vehicleId', // Clave foránea en UserRole que apunta a Role
      otherKey: 'serviceId', // Clave foránea en UserRole que apunta a User
      
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: VEHICLE_TABLE,
      modelName: "Vehicle",
      timestamps: false,
    };
  }
}
module.exports = { UserVehicleSchema, VEHICLE_TABLE, Vehicle };

// export default {USER_TABLE, UserShema,User}
