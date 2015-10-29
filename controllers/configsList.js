var configurations = require("../models/configurations")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs/list"
};

/**
 * Get single/multiple configs
 * @param request
 * @param response
 * @param id
 */
exports.get = function(request, response){
    response.write(JSON.stringify(configurations.list(request.params)) );
    response.end();
}