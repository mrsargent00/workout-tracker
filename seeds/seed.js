const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
