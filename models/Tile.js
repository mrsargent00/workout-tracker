const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Tile extends Model {}
  
Tile.init(
    {
      // assigned by database, primary key
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // title of the tile (e.g. "Miles Ran")
      // the validator is an arbitrary number so that the title is not blank, and not only a single letter
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2], 
        }
      },
      // date tile is created, assigns the current date by default
      date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // optional description of tile
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // references the user it belongs to with the foreign key
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      // converts camel-cased column names to snake case
      underscored: true,
      modelName: 'tile',
    }
  );
  
  module.exports = Tile;
  