const {Model, DataTypes} = require('sequelize');
const DEPARTMENT_TABLE = "Department";

const DepartamentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
};

class Department extends Model {
  static associate(models) {
    this.hasMany(models.Municipality, {
      as: "municipalities",
      foreignKey: "departmentId",
    });
    
    // this.hasMany(models.Laundry, {
    //   as: "laundry",
    //   foreignKey: "departmentId",
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DEPARTMENT_TABLE,
      modelName: "Department",
      timestamps: false,
    };
  }
}

module.exports = { Department, DepartamentSchema, DEPARTMENT_TABLE };
