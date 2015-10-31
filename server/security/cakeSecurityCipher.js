/*

 */

exports.encode = function (request, response, callback, errorCallback) {
    var params = request.params;
    if (users.authenticate(params.username, params.password)) {
        //Generate the auth token and send back as JWT to client
        var combo = params.username + ":" + params.password + ":" + new Date().getTime();
        var key = "They say the cake is a lie, but it might also be true. I had some yesterday!"
        var hash = crypto.createHmac("md5", combo).update(key).digest("hex");
        response.setHeader("Authentication", "cake " + hash);
        callback(request, response);
    }
    else {
        errorCallback(request, response);
    }
}

exports.decode = function (request, response, callback, errorCallback) {
    //extract and convert authcode from base64 to plain string values
    var tmp = authHeaders.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString();        // read it back out as a string

    console.log("Decoded Authorization ", plain_auth);

    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(':');  // split on a ':'
    var username = creds[0];
    var password = creds[1];

    if (users.authenticate(username, password)) {
        callback(request, response);
    }
    else {
        errorCallback(request, response);
    }
}