const { Model, DataTypes, Sequelize } = require("sequelize");

const { VEHICLE_TABLE } = require("./vehicle.models.js");
const { SERVICE_TABLE } = require("./services.models.js");

const APPOINTMENT_TABLE = "appointments";

const AppointmentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.STRING,
  }, 
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  time: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "pendiente",
  },
  observations: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  vehicleId: {
    field: "vehicle_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: VEHICLE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  serviceId: {
    field: "service_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: SERVICE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Appointment extends Model {
  static associate(models) {
    this.belongsTo(models.Service, {
      foreignKey: "serviceId",
    });
    this.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: APPOINTMENT_TABLE,
      modelName: "Appointment",
      timestamps: false,
    };
  }
}

module.exports = { Appointment, AppointmentSchema, APPOINTMENT_TABLE };
