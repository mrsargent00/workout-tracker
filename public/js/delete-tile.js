const deleteTileHandler = async (event) => {
    event.preventDefault();

    const tile_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const deletedTileID = {
        id: tile_id,
    };

    console.log('deletedTileID:', deletedTileID)

    if (deletedTileID) {
        try {
            const response = await fetch(`/api/tiles/delete/${tile_id}`, {
                method: 'DELETE',
                body: JSON.stringify(deletedTileID),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('Tile deleted:', responseData);
                document.location.replace(`/dashboard`);
            } else {
                console.error('Failed to delete tile:', response.status);
            } 
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again.');
        }
    }
}



// for testing
const buttonTest = async (event) => {
    event.preventDefault();
    console.log("button clicked")
    // document.location.replace('/test');
}
  
// event handler for the edit post button
$('#confirm-delete-btn').click(function(event) {
    deleteTileHandler(event);
});
  

  