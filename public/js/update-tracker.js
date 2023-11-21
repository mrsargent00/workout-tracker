$(document).ready(function () {
    const updateTrackerHandler = async (event) => {
      event.preventDefault();
  
      
      // retrieve array of classes of button
      // should be ["update-tile-btn", "current-value-{{tracker.current_tracker_status}}", "tile-{{id}}"]
      const classesArray = event.target.classList;
      console.log('classesArray: ', classesArray) 
      const secondClassofArray = classesArray[1];
      console.log('secondClassofArray: ', secondClassofArray)
      const thirdClassofArray = classesArray[2]
      console.log('thirdClassofArray: ', thirdClassofArray)
      const trackerID = thirdClassofArray.split('-')[1];
      console.log('trackerID: ', trackerID)
  
      console.log('\n----------------\n')
      // first get the original status through the html, convert to number
      const originalTotal = secondClassofArray.split('-')[2];
      const originalTotalINT = Number(originalTotal)
      console.log('value1, current total in database: ', originalTotalINT)
  
      // second get the inputted value, convert to number
      
      const toAddtoTotal = $(`#tracker-${trackerID}`).val().trim();
      const toAddtoTotalINT = Number(toAddtoTotal)
      console.log("value2, inputted number: ", toAddtoTotalINT)
  
      // need error handling here to prevent empty inputs
      if (isNaN(toAddtoTotalINT)) {
        alert('Invalid input. Please enter a valid number.');
        return;
      }
  
      const newTotal = originalTotalINT + toAddtoTotalINT;
      console.log("newTotal: ", newTotal)
  
      const updatedTracker = {
        new_tracker_status: newTotal
      };
  
      console.log("updatedTracker: ", updatedTracker)
  
      if (updatedTracker) {
        try {
          const response = await fetch(`/api/trackers/${trackerID}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTracker),
            headers: { 'Content-Type': 'application/json' },
          })
  
          if (response.ok) {
            const responseData = await response.json();
            console.log('Tracker updated:', responseData);
            window.location.reload();
          } else {
            console.error('Failed to update tracker:', response.status);
          }  
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again.');
        }
      }
    };
    
  
  
    const buttonTest = async (event) => {
      event.preventDefault();
      document.location.replace('/becca');
      // window.location.reload;
  }
  
    // event handler for the udpate button
    $('.update-tile-btn').click(function(event) {
      updateTrackerHandler(event);
    });
    
    // event handler for enter key on field
    $('.update-value').on('keyup', function(event) {
      if (event.key === 'Enter') {
        updateTrackerHandler(event);
      }
    });
    
  });