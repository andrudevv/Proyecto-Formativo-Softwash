

import { Model, DataTypes } from "sequelize";

const TYPE_TABLE = "type";

const typeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  // createAt:{
  //     allowNull: false,
  //     type: DataTypes.DATE,
  //     field: 'create_at',
  //     defaultValue: Sequelize.NOW
  // }
};

class Type extends Model {
  static associate(models) {
    this.hasMany(models.Employee, {
        as: 'employees',
        foreignKey: 'type'
      });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: TYPE_TABLE,
      modelName: "Type",
      timestamps: false,
    };
  }
}
export { typeSchema, TYPE_TABLE, Type};

// export default {USER_TABLE, UserShema,User}
