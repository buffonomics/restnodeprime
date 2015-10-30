
/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function () {
    return "/configs"
};


//Exports.
//DESIGN: Okay so this is going to be a fun one to explain. The thing with
exports.get = require("./configsList").get;
exports.post = require("./configsCreate").post;
exports.put = require("./configsUpdate").put;
exports.patch = require("./configsUpdate").patch;
exports.delete = require("./configsDelete").delete;


exports.get = function (req, res) {
    var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
    console.log("Authorization Header is: ", auth);

    if (!auth) {     // No Authorization header was passed in so it's the first time the browser hit us

        // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
        // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

        res.end('<html><body>Need some creds son</body></html>');
    }

    else if (auth) {    // The Authorization was passed in so now we validate it

        var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string

        console.log("Decoded Authorization ", plain_auth);

        // At this point plain_auth = "username:password"

        var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        var password = creds[1];

        if ((username == 'foo') && (password == 'bar')) {   // Is the username/password correct?

            res.statusCode = 200;  // OK
            res.end('<html><body>Congratulations you just hax0rd teh Gibson!</body></html>');
        }
        else {
            res.statusCode = 401; // Force them to retry authentication
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

            // res.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

            res.end('<html><body>You shall not pass</body></html>');
        }
    }
}