const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const newCommentContent = $('#new-comment-content').val().trim();
   
    // traverse DOM to retreive post_id number from URL
    const newCommentTileID = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    console.log('newCommentContent:', newCommentContent)

    const newCommentInput = {
      content: newCommentContent,
      // user_id:  do this at the back end
      tile_id: newCommentTileID
    };

    console.log(newCommentInput)

    if (newCommentInput) {
        try {
            const response = await fetch('/api/comments/create', {
                method: 'POST',
                body: JSON.stringify(newCommentInput), 
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const responseData = await response.json();
                console.log('New comment created:', responseData);
                document.location.reload();
            }
        } catch (error) {
        console.error(error);
        alert('An unexpected error occurred. Please try again.');
        }
    }   
}
  
const buttonTest = async (event) => {
    event.preventDefault();
    document.location.replace('/becca');
    // window.location.reload;
    console.log("button clicked")
}


// event handler for the signup button
$('#comment-btn').click(function(event) {
    newCommentHandler(event);
});
  
  // event handler for enter key on the last input field
  $('#password-signup').on('keyup', function(event) {
    if (event.key === 'Enter') {
        newCommentHandler(event);
    }
  });
  
  