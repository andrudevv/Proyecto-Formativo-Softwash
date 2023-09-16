import { Model, DataTypes } from "sequelize";

const CATEGORY_TABLE = "categories";

const categoryVehicleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  }
  // createAt:{
  //     allowNull: false,
  //     type: DataTypes.DATE,
  //     field: 'create_at',
  //     defaultValue: Sequelize.NOW
  // }
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Vehicle, {
      as: "Vehicles",
      foreignKey: "categoryId",
    });
    this.hasMany(models.Service, {
      as: "Services",
      foreignKey: "categoryId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "CategoryVehicle",
      timestamps: false,
    };
  }
}
export { categoryVehicleSchema, CATEGORY_TABLE, Category };

// export default {USER_TABLE, UserShema,User}
