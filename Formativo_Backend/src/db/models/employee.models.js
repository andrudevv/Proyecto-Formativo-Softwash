const {Model, DataTypes} = require('sequelize');
const EMPLOYEE_TABLE = "employees";
const {LAUNDRY_TABLE} = require('./laundry.models.js')
const {TYPE_TABLE} = require('./typeEmployee.models.js');
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
  laundryId:{
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
  typeEmployee: {
    field: 'type_employee',
    allowNull: true,
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
    this.belongsTo(models.Type, { foreignKey: 'typeEmployee' });
    this.belongsTo(models.laundry, { foreignKey: 'laundryId' });
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
module.exports = { Employee , EmployeeSchema, EMPLOYEE_TABLE};

// export default {USER_TABLE, UserShema,User}
