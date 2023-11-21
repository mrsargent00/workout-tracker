const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connections');

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
  User.init(
    {
      // assigned by database, primary key
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // the user's first name
      // the validator is an arbitrary number so that the name is not blank, and not only a single letter
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2],
        },
      },
      // the user's first name
      // the validator is an arbitrary number so that the name is not blank, and not only a single letter
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2],
        },
      },
      // the user's date of birth
      // collect user input (on front end) via a drop down?
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      // the user's email
      // must be unique to be added to the database
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      // the user's password
      // validator requires password to be at least 5 characters
      // maybe can add further validation to require password to be alphanumeric with mixed case and special characters
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5],
        },
      },
    },
    {
      // hooks are so password is hashed before being stored/updated in db
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;
  