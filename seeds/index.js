const sequelize = require('../config/connections');

const seedComments = require('./commentData');
const seedTrackers = require('./trackerData');

var colors = require('colors');
colors.enable();


const seedDatabase = async () => {
  // force true - tells Sequelize to drop all existing tables in the database 
  await sequelize.sync({ force: true });

  // seedComments calls seedTiles which calls seedUsers
  await seedComments();
  console.log('\n----- Comments Seeded, moving onto Trackers... -----\n'.yellow);

  await seedTrackers();
  console.log('\n----- Trackers Seeded... -----\n'.yellow);

  console.log('\n----- Users, Tiles, Comments, and Trackers have all been seeded. -----\n'.bold.green);

  process.exit(0);
};

seedDatabase();