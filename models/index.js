const User = require('./User');
const Tile = require('./Tile');
const Comment = require('./Comment');
const Tracker = require('./Tracker');


// user model associations
User.hasMany(Tile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' // when user is deleted, their tiles are deleted
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' // when user is deleted, their comments are deleted
});


// tile model associations
Tile.belongsTo(User, {
    foreignKey: 'user_id'
});

Tile.hasOne(Tracker, {
    foreignKey: 'tile_id'
});

Tile.hasMany(Comment, {
    foreignKey: 'tile_id',
    onDelete: 'CASCADE' // when tile is deleted, corresponding comments are deleted
});


// comment model associations
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Tile, {
    foreignKey: 'tile_id'
});


// tracker model associations
Tracker.belongsTo(Tile, {
    foreignKey: 'tile_id'
});

module.exports = { User, Tile, Comment, Tracker };