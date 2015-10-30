var status = require("../server/utils/status");

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function () {
    return "/login"
};

/**
 * Responses get written to here.
 * @param request
 * @param response
 * @param id
 */
exports.get = function (request, response) {
    var authHeaders = request.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    if (authHeaders) {
        //return same as else?
        status.successToResponse(response,{message:"You are already Logged in."})
    }
    else{
        //TODO: respond with authentication details. Work with oAuth or hmac or something. send as header


        response.end();
    }
}