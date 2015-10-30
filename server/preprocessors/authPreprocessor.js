status = require("../utils/status");
users = require("../../data/users");

function notAuthorized(response)
{
    response.statusCode = 401;
    response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"'); //if HTTP
    status.errorToResponse(response, "Not Authorized");
    response.end();
}

/**
 * This preprocessor ensures that all attempts at protected controllers are authenticated.
 * All preprocessors should export the function: process(request, response, controller, callback).
 *
 * @param request
 * @param response
 * @param controller
 * @param callback
 */
exports.process = function (request, response, controller, callback) {
    //Determine need for auth
    var authRequired = controller.protected ? controller.protected() : false;
    if (authRequired) {
        var authHeaders = request.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
        console.log("Authorization Header is: ", authHeaders);

        if (authHeaders) {
            //TODO authorization header might need to process different schemes?

            //extract and convert authcode from base64 to plain string values
            var tmp = authHeaders.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
            var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
            var plain_auth = buf.toString();        // read it back out as a string

            console.log("Decoded Authorization ", plain_auth);

            // At this point plain_auth = "username:password"
            var creds = plain_auth.split(':');  // split on a ':'
            var username = creds[0];
            var password = creds[1];

            if (users.authenticate(username, password)) {
                response.statusCode = 200;  // OK
                callback(request, response);
            }
            else {
                notAuthorized(response);
            }
        }
        else {
            //Trying to access protected controller without any security.
            notAuthorized(response);
        }
    }
    else {
        //No further authorization needed to access this controller
        callback(request, response);
    }

}

