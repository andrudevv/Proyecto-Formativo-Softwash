import { Model, DataTypes } from "sequelize";

import { TYPE_TABLE } from './typeEmployee.models.js'
const EMPLOYEE_TABLE = "employees";

const EmployeeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  tipeEmployee: {
    field: 'type',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TYPE_TABLE,
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

class Employee extends Model {
  static associate(models) {
    this.belongsTo(models.Employee, { as: 'Type' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: "Employee",
      timestamps: false,
    };
  }
}
export { Employee , EmployeeSchema, EMPLOYEE_TABLE};

// export default {USER_TABLE, UserShema,User}
