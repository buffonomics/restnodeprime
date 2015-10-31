

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
    response.setHeader("Authentication",null);
    response.write(JSON.stringify({message: "You have been logged out"}));
    response.end();
}