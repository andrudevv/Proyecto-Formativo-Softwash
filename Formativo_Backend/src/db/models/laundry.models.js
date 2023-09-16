import { Model, DataTypes } from "sequelize";
import {DEPARTMENT_TABLE} from './department.models.js'
import { MUNICIPALITY_TABLE } from "./municipality.models.js";
const LAUNDRY_TABLE = "laundry";

const LaundrySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  rutLaundry: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  },
  ability: {
    allowNull: true,
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  departmentId: {
    field: 'department_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: DEPARTMENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
  // ,municipalityId: {
  //   field: 'municipality_id',
  //   allowNull: true,
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: MUNICIPALITY_TABLE,
  //     key: 'id'
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL'
  // }
  // createAt:{
  //     allowNull: false,
  //     type: DataTypes.DATE,
  //     field: 'create_at',
  //     defaultValue: Sequelize.NOW
  // }
};

class Laundry extends Model {
  static associate(models) {
    this.belongsTo(models.Department, { foreignKey:"departmentId", as: 'Department' });
    this.belongsTo(models.Municipality, { foreignKey:"municipalityId", as: 'Municipality' });

    // this.hasMany(models.Service,{foreignKey:"laundryId", as: 'services'})
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
export { LaundrySchema, LAUNDRY_TABLE,Laundry };

// export default {USER_TABLE, UserShema,User}

