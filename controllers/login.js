var status = require("../server/utils/status");
var crypto = require("crypto");
var users = require("../data/users");
var cipher = require("../server/security/cakeSecurityCipher")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function () {
    return "/login"
};

function notAuthorized(response) {
    //response.statusCode = 401;
    //response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"'); //if HTTP
    status.errorToResponse(response, "Not Authorized", 401);
    response.end();
}

/**
 * Responses get written to here.
 * @param request
 * @param response
 * @param id
 */
exports.get = function (request, response) {
    //var authHeaders = request.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    //if (authHeaders) {
    //    //return same as else?
    //    status.successToResponse(response,{message:"You are already Logged in."})
    //}
    //else{
    //
    //}

    cipher.encode(request, response,
        function (request, response) {
            status.successToResponse(response,{message:"You successfully logged in"});
        },
        function (request, callback) {
            status.errorToResponse(response, "Wrong username and password");
        }
    );

}