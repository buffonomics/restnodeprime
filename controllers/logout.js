

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
    response.write(JSON.stringify({message: "This is a REST server. Please use POST for this"}));
    response.end();
}