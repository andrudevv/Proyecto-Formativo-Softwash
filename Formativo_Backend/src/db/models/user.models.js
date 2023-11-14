const {Model, DataTypes} = require('sequelize');
const {DEPARTMENT_TABLE} = require('./department.models.js');
const { MUNICIPALITY_TABLE} = require('./municipality.models.js')
const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
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
  },
  role: {
    allowNull: false,
    defaultValue: 'user',
    type: DataTypes.STRING
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

class User extends Model {
  static associate(models) {
    this.hasMany(models.Vehicle, {
      as: 'vehicles',
      foreignKey: 'userId'
    });
    this.belongsTo(models.Municipality, { foreignKey:"municipalityId", as: 'Municipality' });
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
module.exports = { UserSchema,USER_TABLE, User };

// export default {USER_TABLE, UserShema,User}
