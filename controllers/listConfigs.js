var configurations = require("../models/configurations")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs/list"
};

/**
 * Responses get written to here.
 * @param request
 * @param response
 * @param id
 */
exports.action = function(request, response){

    response.write(JSON.stringify(configurations.list(request.params)) );
    response.end();
}