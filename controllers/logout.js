var security = require("../server/security/cakeSecurity");
var status = require("../server/utils/status")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/logout"
};

/**
 * Responses get written to here.
 * @param request
 * @param response
 * @param id
 */
exports.get = function(request, response){
    security.logout(request,response, function(request, response){
        status.successToResponse(response,"",204);
    })
}