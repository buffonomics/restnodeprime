

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/login"
};

/**
 * Responses get written to here.
 * @param request
 * @param response
 * @param id
 */
exports.action = function(request, response, id){

    //request.on('data', function (chunk) {
    //    console.log('BODY: ' + chunk);
    //});
    response.write(JSON.stringify({name: "Login", mood: "jerk-ish"}));

    response.end();

}