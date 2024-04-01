//To Sign up send a Post request to
`http://127.0.0.1:3000/api/v1/user/signup`

//To login send a Post request to
`http://127.0.0.1:3000/api/v1/user/login`

/* To both signup you need to put the following in the body
    {
        "email": enter an email in the valid email format,
        "password": Enter an 8 character password,
        "role": enter either 'admin' or 'guest'. However, not entering a role automatically assigns you to a guest role
    }

    To login just fill the email and password field
 */


// To get all rooms, add a room, send the GET requests to 
`http://127.0.0.1:3000/api/v1/rooms`

// To get a specific room, update a room, delete a room send the relevant with the ID
`http://127.0.0.1:3000/api/v1/rooms/{id}`

// To get all roomtpes, add a roomtpe, send the GET and POST requests respectively to 
`http://127.0.0.1:3000/api/v1/roomtpe`

// To get a specific roomtpe, update a roomtpe, delete a roomtpe send the relevant with the ID. Note that you must first be logged in as an Admin
`http://127.0.0.1:3000/api/v1/roomtpe/{id}`
