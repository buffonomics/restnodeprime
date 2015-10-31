var status = require("../utils/status");
var users = require("../../data/users");
var cipher = require("../security/cakeSecurity");


function notAuthorized(response) {
    status.errorToResponse(response, "Not Authorized", 401);
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
        var authHeaders = request.headers['authorization'];  // auth is in base64(username:password)  so we need to verify the base64
        console.log("Authorization Header is: ", authHeaders);

        if (authHeaders) {
            cipher.verify(request, response,
                function (request, response) {
                    response.statusCode = 200;  // OK
                    callback(request, response);
                },
                function (request, callback) {
                    notAuthorized(response);
                }
            );

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

