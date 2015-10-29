var configurations = require("../models/configurations");
var status = require("../server/utils/status");
var validator = require("../server/utils/validator");

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs/update"
};


/**
 * Updates a config. if request.method is post, do fullUpdate. If method is patch, then it's a partial update.
 * @param request
 * @param response
 * @param id
 */
function update(request, response){
    var partialUpdate = request.method==="patch"? true: false;
    var result = configurations.update(request.params,partialUpdate);
    response.write(JSON.stringify(result));
    response.end();
}

exports.post = update;
exports.put = update;
exports.patch = update;
