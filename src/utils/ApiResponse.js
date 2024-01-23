class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode  //HTTP status code of the response
        this.data = data                // Data returned by the API
        this.message = message          // A message associated with the response, default is "Success"
        this.success = statusCode < 400     // A boolean indicating whether the response is successful (status code < 400)
    }
}

export { ApiResponse }


// status code:= three-digit numbers returned by a server in response to a client's 
//request made to the server
//A status code less than 400 generally indicates a successful request,
// while a status code of 400 or greater indicates an error or some form of failure.