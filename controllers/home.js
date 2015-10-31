var fs = require('fs');
/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "";
};

/**
 * The content type of the response of this controller.
 * @returns {string}
 */
exports.contentType = function(){
    return "text/html";
}

/**
 * Responses get written here. No need to return anything, just call response.end().
 * @param request
 * @param response
 * @param id
 */
exports.get = function(request, response){
    // DESIGN: Alternatively, I could also cache all HTML within the html folder upon launch in engine.setup(),
    // but this is better for development. Can be a production-config thing later.
    fs.readFile('./html/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.write(html);
        response.end();
    });
}