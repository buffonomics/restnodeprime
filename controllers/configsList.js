var configurations = require("../data/configurations")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs/list"
};

/**
 * This signifies that this controller requires authentication to be accessed.
 * @returns {boolean}
 */
exports.protected = function () {
    return true;
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