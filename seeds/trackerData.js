const { Tracker } = require('../models');

const seedTrackers = async () => {
    const trackerData = [
        {
            tracker_goal: 200000,
            current_tracker_status: 50000,
            tile_id: 1
        },
        {
            tracker_goal: 5,
            current_tracker_status: 0,
            tile_id: 2
        },
        {
            tracker_goal: 200,
            current_tracker_status: 500,
            tile_id: 3  
        },
        {
            tracker_goal: 99999,
            current_tracker_status: 1,
            tile_id: 4
        },
        {
            tracker_goal: 600,
            current_tracker_status: 100,
            tile_id: 5
        },
        {
            tracker_goal: 15,
            current_tracker_status: 2,
            tile_id: 6
        }
    ];

    await Tracker.bulkCreate(trackerData);
}


module.exports = seedTrackers;