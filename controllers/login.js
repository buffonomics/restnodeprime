var status = require("../server/utils/status");
var security = require("../server/security/cakeSecurity")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function () {
    return "/api/v1/login"
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
exports.post = function (request, response) {
    security.createToken(request, response,
        function (request, response, token) {
            status.successToResponse(response,{message:"You successfully logged in"});
        },
        function (request, callback) {
            status.errorToResponse(response, "Wrong username and password");
        }
    );

}