
const newTileHandler = async (event) => {
    event.preventDefault();
    const tileTitle = $(`#new-tile-title`).val().trim();
    const tileDescription = $(`#new-tile-description`).val().trim();

    // error handler to check for number?
    const trackerGoal = $(`#new-tracker-goal`).val().trim();

    console.log(tileTitle, tileDescription, trackerGoal)

    const newTile = {
        title: tileTitle ,
        description: tileDescription,
        // user_id:  do this at the back end
    };

    // need to make to fetch calls
    // one to the tile 
    // one to tracker

       if(newTile) {
        try {
            const tileResponse = await fetch('/api/tiles/create/', {
                method: 'POST',
                body: JSON.stringify(newTile),
                headers: { 'Content-Type': 'application/json' },
            })
        if (tileResponse.ok) {
            const tileResponseData = await tileResponse.json();
            console.log('Tracker created:', tileResponseData);
            // can i get the new tile's id????? and then assign it to the const above??
            const newTileID = tileResponseData.id;

            const newTracker = {
                tracker_goal: trackerGoal ,
                tile_id: newTileID, 
            };

            const trackerResponse = await fetch('/api/trackers/create/', {
                method: 'POST',
                body: JSON.stringify(newTracker),
                headers: { 'Content-Type': 'application/json' },
            });

            if (trackerResponse.ok) {
                const trackerResponseData = await trackerResponse.json();
                console.log('Tracker created:', trackerResponseData);
                window.location.reload();
            } else {
                console.error('Failed to create tracker:', trackerResponse.status);
            }
        } else {
            console.error('Failed to create tile:', tileResponse.status);
        }  
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again.');
        }
    }
};


// event handler for the udpate button
$('#create-btn').click(function(event) {
    newTileHandler(event);
});

// event handler for enter key on field
$('#new-tile-goal').on('keyup', function(event) {
    if (event.key === 'Enter') {
    newTileHandler(event);
    }
});