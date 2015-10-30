/**
 * Utility module for status messages and responses
 */

function success( result){
    var info = {"success": true};
    if(result) info["result"] = result;
    return info;
}

function error( message, code){
    var error = {"success": false};
    if(code) error["code"] = code;
    if(message) error["message"] = message;
    return error;
}

/**
 * For quick error rendering from controllers.
 * @param response
 * @param message
 * @param code
 */
exports.errorToResponse = function (response, message, code){
    if(code) response.statusCode = code;
    response.write(JSON.stringify(error(message,code)));
    response.end();
}

/**
 * For quick status rendering from controllers of successful operations.
 * @param response
 * @param result
 */
exports.successToResponse = function (response, result){
    response.write(JSON.stringify(success(result)));
    response.end();
}

exports.success = success;
exports.error = error;




