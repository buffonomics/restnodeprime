var configurations = require("../models/configurations");
var serverutil = require("../server/util");

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs/create"
};


/**
 * Creates a config. Expected params are name, hostname, port, and username.
 * @param request
 * @param response
 * @param id
 */
exports.action = function(request, response, id){

    var rules = {"required":["name","hostname","port","username"]};
    var valid_dict = serverutil.sanitizeParams(rules,request.params);
    if(!valid_dict || typeof valid_dict == "string")
    {
        serverutil.errorToResponse(response, valid_dict);
    }
    else {
        serverutil.successToResponse(response, configurations.create(valid_dict));
    }
    response.end();
}