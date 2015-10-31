var status = require("../utils/status");
var users = require("../../data/users");
var sessions = require("../../data/sessions")
var crypto = require('crypto'),
    crypto_algo = 'sha1',
    key = "The cake is a lie, but the pie...now there's an honest chap";

//Create an authentication token
exports.createToken = function (request, response, callback, errorCallback) {
    var params = request.params;
    if (users.authenticate(params.username, params.password)) {
        //Generate the auth token and send back as JWT to client
        var expires = new Date();
        expires.setDate(expires.getDate() + 1);
        expires = expires.getTime();

        var combo = params.username + ":>" + params.password + ":>cake" + expires;
        var token = crypto.createHmac(crypto_algo, key).update(combo).digest("hex");
        response.setHeader("Authentication", "cake " + token);
        sessions.add(token, expires, request.connection.remoteAddress);
        callback(request, response, token);
    }
    else {
        errorCallback(request, response);
    }
}

//Verify auth token
exports.verify = function (request, response, callback, errorCallback) {
    var auth = request.headers["authorization"];
    var hash = auth.split(" ")[1];

    var token = sessions.get(hash);

    if (token && token.active && new Date().getTime() < token.expires) {
        callback(request, response);
    }
    else {
        errorCallback(request, response);
    }
}

/**
 * Handle token invalidation
 * @param request
 * @param response
 * @param callback
 */
exports.logout = function (request, response, callback) {
    /*
     DESIGN: We may want to keep a session log with IP addresses and such, so just invalidate.
     Can delete later as neccessary
     */
    try {
        var auth = request.headers["authorization"];
        if (auth) {
            var hash = auth.split(" ")[1];
            sessions.invalidate(hash)
        }
    }
    catch (err) {
        console.log(err)
    }

    callback(request, response);
}