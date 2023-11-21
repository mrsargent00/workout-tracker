const signupHandler = async (event) => {
    event.preventDefault();
  
    const first_name = $('#first-name-signup').val().trim();
    const last_name = $('#last-name-signup').val().trim();
    const email = $('#email-signup').val().trim();
    const date_of_birth = $('#date-of-birth-signup').val().trim();
    const password = $('#password-signup').val().trim();
  
    if (!(first_name && last_name && email && password)) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const newUserData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      date_of_birth: date_of_birth,
      password: password
    };
  
    console.log('newUserData:', newUserData)
  
    try {
      const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(newUserData),
          headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
          // replace with proper endpoint upon signing in
          document.location.replace('/becca');
          
      } else {
          // implement error handling when the user already exists?
          const error_message = await response.text();
          console.error(error_message);
          alert(`Error: ${error_message}\nCheck console for further details.`);
      }
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred. Please try again.');
    }
  };
  
  // event handler for the signup button
  $('#signup-btn').click(function(event) {
    signupHandler(event);
  });
  
  // event handler for enter key on the last input field
  $('#password-signup').on('keyup', function(event) {
    if (event.key === 'Enter') {
      signupHandler(event);
    }
  });
  