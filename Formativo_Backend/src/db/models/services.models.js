import { Model, DataTypes , Sequelize} from "sequelize";


import { LAUNDRY_TABLE } from "./laundry.models.js";

import { CATEGORY_TABLE } from "./category.vehicle.model.js";
const SERVICE_TABLE = 'services';

const ServiceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duraction: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  laundryId: {
    field: 'laundry_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: LAUNDRY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  categoryId: {
    field: 'categoryId',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}


class Service extends Model {

  static associate(models) {
    this.belongsTo(models.laundry, { foreignKey: 'laundryId', as: 'laundry' });
    this.belongsTo(models.CategoryVehicle, { foreignKey: 'categoryId', as: 'CategoryVehicle' });
    this.belongsToMany(models.Vehicle, {
        as: 'Service',
        through: models.Appointment,
        foreignKey: 'serviceId',
        otherKey: 'vehicleId'
      });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SERVICE_TABLE,
      modelName: 'Service',
      timestamps: false
    }
  }
}

export { Service, ServiceSchema, SERVICE_TABLE };
