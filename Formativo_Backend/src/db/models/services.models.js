const {Model, DataTypes, Sequelize} = require('sequelize');

const {LAUNDRY_TABLE} = require('./laundry.models.js');
const img ='./logoServices.jpg'
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
  duration: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
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
  typeVehicles: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}


class Service extends Model {

  static associate(models) {
    this.belongsTo(models.laundry, { foreignKey: 'laundryId' });
    this.belongsToMany(models.Vehicle, {
        as: 'Vehicle',
        through: models.Appointment,
        foreignKey: 'serviceId',
        otherKey: 'vehicleId'
      });
    // this.hasMany(models.Appointment,{foreignKey: 'serviceId'})
      
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

module.exports = { Service, ServiceSchema, SERVICE_TABLE };
