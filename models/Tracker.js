const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Tracker extends Model {}
  
Tracker.init(
    {
      // assigned by database, primary key
      // for now, this id is not utilized because each tile has only one tracker.
      // future development could utilize this id number if tiles hold multiple trackers.
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // the total goal (e.g. 10000 if the goal is 10000 steps)
      // validator to make sure it's a number
      tracker_goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        }
      },
      // validator to make sure it's a number
      // the current total the user is at. they will be able to add to this total.. 
      // need to define a method here for that functionality
      current_tracker_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isNumeric: true,
        }
      },
      percentage: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.tracker_goal !== 0) {
            return (this.current_tracker_status / this.tracker_goal) * 100;
          } else {
            return 0; 
          }
        }
      },
      // references the tile it belongs to with the foreign key
      tile_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tile',
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
      modelName: 'tracker',
    }
  );
  
module.exports = Tracker;