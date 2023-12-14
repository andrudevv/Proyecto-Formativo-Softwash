const {Model, DataTypes} = require('sequelize');
const {DEPARTMENT_TABLE} = require('./department.models.js');
const { MUNICIPALITY_TABLE } = require('./municipality.models.js');
// import { MUNICIPALITY_TABLE } from "./municipality.models.js";
const LAUNDRY_TABLE = "laundry";
const img ='logoServices.jpg'

const LaundrySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  rutLaundry: {
    allowNull: false,
    type: DataTypes.BIGINT,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.BIGINT,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },membership: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true 
  },imageUrl:{
    type:DataTypes.STRING,
    allowNull: true,
    defaultValue: img
  },
  ability: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  aperture: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  closing: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  municipalityId: {
    field: 'municipality_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: MUNICIPALITY_TABLE,
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

class Laundry extends Model {
  static associate(models) {
    this.belongsTo(models.Municipality, { foreignKey:"municipalityId" });
    this.hasMany(models.Service,{foreignKey:"laundryId"})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LAUNDRY_TABLE,
      modelName: "laundry",
      timestamps: false,
    };
  }
}
module.exports = { LaundrySchema, LAUNDRY_TABLE, Laundry };

// export default {USER_TABLE, UserShema,User}

