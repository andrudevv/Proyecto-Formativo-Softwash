'use strict';


const img = 'logoServices.jpg'
const { MUNICIPALITY_TABLE } = require('../src/db/models/municipality.models.js');
const { USER_TABLE } = require('../src/db/models/user.models.js');
const { VEHICLE_TABLE} = require('../src/db/models/vehicle.models.js');
const { LAUNDRY_TABLE } = require('../src/db/models/laundry.models.js');
const { SERVICE_TABLE} = require('../src/db/models/services.models.js');
const { APPOINTMENT_TABLE} = require('../src/db/models/appointment.models.js');
const { DEPARTMENT_TABLE } = require('../src/db/models/department.models.js');
module.exports ={ 
up:  async (queryInterface, Sequelize) => {
  
  await queryInterface.createTable(DEPARTMENT_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  });
  await queryInterface.createTable(MUNICIPALITY_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      field: 'department_id',
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: DEPARTMENT_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }, 
  });
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      documentUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.BIGINT,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        defaultValue: 'user',
        type: Sequelize.DataTypes.STRING
      },
      municipalityId: {
        field: 'municipality_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: MUNICIPALITY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(VEHICLE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      // placa
      plate: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      color: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      userId: {
        field: 'user_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      typeVehicle: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      }
    });
    await queryInterface.createTable(LAUNDRY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      rutLaundry: {
        allowNull: false,
        type: Sequelize.DataTypes.BIGINT,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },imageUrl:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: img
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.BIGINT,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },membership: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false 
      },
      ability: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 1
      },
      aperture: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      closing: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      municipalityId: {
        field: 'municipality_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: MUNICIPALITY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    
    
    
    
    
    await queryInterface.createTable(SERVICE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      laundryId: {
        field: 'laundry_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: LAUNDRY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      typeVehicles: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
    
    
    await queryInterface.createTable(APPOINTMENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
      },
      time: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: "pendiente",
      },
      observations: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      vehicleId: {
        field: 'vehicle_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: VEHICLE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      serviceId: {
        field: 'service_id',
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: SERVICE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(VEHICLE_TABLE);
    await queryInterface.dropTable(DEPARTMENT_TABLE);
    await queryInterface.dropTable(MUNICIPALITY_TABLE);
    await queryInterface.dropTable(LAUNDRY_TABLE);
    await queryInterface.dropTable(SERVICE_TABLE);
    await queryInterface.dropTable(APPOINTMENT_TABLE);
  }

}

