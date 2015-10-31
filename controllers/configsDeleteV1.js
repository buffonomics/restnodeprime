var configurations = require("../data/configurations");
var status = require("../server/utils/status");

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/api/v1/configs/delete"
};

/**
 * This signifies that this controller requires authentication to be accessed.
 * @returns {boolean}
 */
exports.protected = function () {
    return true;
};

/**
 * Deletes a config.
 * @param request
 * @param response
 * @param id
 */
function doDelete(request, response){

    var name = request.params["name"];
    if(name)
        response.write(JSON.stringify(configurations.delete(name)));
    else
        status.errorToResponse(response, "No name/ID given");

    response.end();
}

exports.delete = doDelete;
exports.post = doDelete;