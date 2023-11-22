const { Tile } = require('../models');
const seedUsers = require('./userData');
var colors = require('colors');
colors.enable();

const seedTiles = async () => {
    // run seedUsers for access to key-value pairs from userData.js
    const userMap = await seedUsers(); 
    console.log('\n----- Users seeded, moving onto Tiles... -----\n'.yellow);
    
    const tileData = [
        {
            title: "Steps",
            date_created: "10-01-2023",
            description: "Reach 200,000 steps in a month.",
            user_id: userMap.get("megan@sargent.com").id,
        },
        {
            title: "Miles Biked",
            date_created: "10-02-2023",
            description: "Want to run 5 miles in a month.",
            user_id: userMap.get("megan@sargent.com").id,
        },
        {
            title: "Push-Ups",
            date_created: "10-03-2023",
            description: "Want to do 500 pushups in a month.",
            user_id: userMap.get("ben@rodriguez.com").id,
        },
        {
            title: "Miles Ran",
            date_created: "10-04-2023",
            description: "Want to run 99,999 miles this month.",
            user_id: userMap.get("ben@rodriguez.com").id,
        },
        {
            title: "Minutes Walked",
            date_created: "10-05-2023",
            description: "Want to walk 600 minutes this month.",
            user_id: userMap.get("becca@lee.com").id,
        },
        {
            title: "Pool Visits",
            date_created: "10-06-2023",
            description: "Want to go to the pool 15 times this month.",
            user_id: userMap.get("becca@lee.com").id,
        }
    ];

    
    // create tiles in db
    await Tile.bulkCreate(tileData);

    // return userMap for use again
    return userMap;
}


module.exports = seedTiles;