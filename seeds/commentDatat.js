const { Comment } = require('../models');
const seedTiles = require('./tileData');
var colors = require('colors');
colors.enable();


const seedComments = async () => {
    // run seedTiles for access to key-value pairs (originally created in userData.js)
    const userMap = await seedTiles();
    console.log('\n----- Tiles seeded, moving onto Comments... -----\n'.yellow);

    const commentData = [
        {
            date_created: "10-10-2023",
            content: "Way to go!",
            user_id: userMap.get("megan@sargent.com").id, // user_id referencing Megan
            tile_id: 3,
        }, 
        {
            date_created: "10-10-2023",
            content: "Stay strong!",
            user_id: userMap.get("megan@sargent.com").id, // user_id referencing Megan
            tile_id: 5,
        }, 
        {
            date_created: "10-10-2023",
            content: "You've got this!",
            user_id: userMap.get("ben@rodriguez.com").id, // user_id referencing Ben
            tile_id: 1,
        }, 
        {
            date_created: "10-10-2023",
            content: "Don't give up!",
            user_id: userMap.get("ben@rodriguez.com").id, // user_id referencing Ben
            tile_id: 6,
        }, 
        {
            date_created: "10-10-2023",
            content: "Great job!",
            user_id: userMap.get("becca@lee.com").id, // user_id referencing Becca
            tile_id: 2,
        }, 
        {
            date_created: "10-10-2023",
            content: "Almost there!",
            user_id: userMap.get("becca@lee.com").id, // user_id referencing Becca
            tile_id: 4,
        }, 
    ];

    // create comments in db
    await Comment.bulkCreate(commentData);

}


module.exports = seedComments;