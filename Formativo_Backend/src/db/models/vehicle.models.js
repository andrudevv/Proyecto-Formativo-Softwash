import { Model, DataTypes } from "sequelize";

import { CATEGORY_TABLE } from "./category.vehicle.model.js";
import { USER_TABLE} from './user.model.js'
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
    unique: true,
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
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  categoryId: {
    field: 'category_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
    this.belongsTo(models.CategoryVehicle, { foreignKey: "categoryId",as: 'CategoryVehicle' });
    this.belongsTo(models.User, { foreignKey:"userId",as: 'User' });
    // this.(models.Appointment, {
    //   through: models.Appointment, // Tabla puente
    //   foreignKey: 'vehicleId', // Clave foránea en UserRole que apunta a Role
    //   otherKey: 'serviceId', // Clave foránea en UserRole que apunta a User
    //   as: 'Vehicle',
    // });
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
export { UserVehicleSchema, VEHICLE_TABLE, Vehicle };

// export default {USER_TABLE, UserShema,User}
