var configurations = require("../models/configurations");
var status = require("../server/utils/status");

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs/delete"
};


/**
 * Creates a config. Expected params are name, hostname, port, and username.
 * @param request
 * @param response
 * @param id
 */
exports.action = function(request, response, id){

    var name = request.params["name"];
    if(name)
        response.write(JSON.stringify(configurations.delete(name)));
    else
        status.errorToResponse(response, "No name/ID given");

    response.end();
}