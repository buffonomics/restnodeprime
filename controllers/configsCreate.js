var configurations = require("../data/configurations");
var status = require("../server/utils/status");
var validator = require("../server/utils/validator");

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function () {
    return "/configs/create"
};

/**
 * This signifies that this controller requires authentication to be accessed.
 * @returns {boolean}
 */
exports.protected = function () {
    return true;
};

/**
 * Creates a config. Expected params are name, hostname, port, and username.
 * @param request
 * @param response
 * @param id
 */
function create (request, response, id) {

    var result = configurations.create(request.params);
    response.write(JSON.stringify(result));
    response.end();
}

exports.post = create;
exports.put = create;