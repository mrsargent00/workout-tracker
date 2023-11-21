const loginHandler = async (event) => {
    event.preventDefault();
  
    const email = $('#email-login').val().trim();
    const password = $('#password-login').val().trim();
  
  
    const loginData = {
        email: email,
        password: password
    };
    
    console.log(loginData)
  
    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' },
            });
      
            console.log(response)
  
            if (response.ok) {
              // replace with proper endpoint upon logging in
                document.location.replace('/dashboard');
  
            } else {
                const error_message = await response.text();
                console.error(error_message);
                alert(`Error: ${error_message}\nCheck console for further details.`);
            }
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again.');
        }
    }
  };
  
  
  // event handler for the login button
  $('#login-btn').click(function(event) {
    loginHandler(event);
  });
  
  
  // event handler for enter key on the last input field
  $('#password-login').on('keyup', function(event) {
    if (event.key === 'Enter') {
      loginHandler(event);
    }
  });