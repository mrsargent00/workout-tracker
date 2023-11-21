const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Comment extends Model {}
  
  Comment.init(
    {
      // assigned by database, primary key
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // date comment is posted, assigns the current date by default
      date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // the text content of the comment
      // the validator is an arbitrary number so that the comment is not blank, and not only a single letter
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2], 
        }
      },
      // references the user it belongs to with the foreign key
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
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
      modelName: 'comment',
    }
  );
  
  module.exports = Comment;
  