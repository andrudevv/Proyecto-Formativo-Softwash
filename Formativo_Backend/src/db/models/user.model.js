import { Model, DataTypes } from "sequelize";

const USER_TABLE = "users";

const UserShema = {
  documentUser: {
    allowNull: false,
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
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  email: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  municipality: {
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

class User extends Model {
  static associate() {
    //associate
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}
export { UserShema, User };

// export default {USER_TABLE, UserShema,User}
