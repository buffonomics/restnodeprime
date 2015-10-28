/*
 Server Engine by Iyobo Eki

 This prepares all controllers, extracts/generate their routes, and makes a map of them all.

 All controller modules MUST be in the controllers folder and shall export the following:

 Required:
 route: Return the url route that should point to this controller.
 action: Perform all major processing and modify response object as needed.
 `Optional
 contentType: The mimeType for the response associated with the controller. Default: "application/json"
 */


var http = require("http");
var https = require('https');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var DEFAULT_CONTENT_TYPE = "application/json";

var server;
var routes = {};
var MAX_REQUEST_SIZE = 1024 * 500; //0.5MB max request

/**
 * run through controllers to extract and generate routes
 */
function setup() {
    //Load all controller modules
    fs.readdir('./controllers/', function (err, files) {
        if (err) throw err;

        files.forEach(function (file) {
            var controller = require("../controllers/" + file);
            var route = controller.route();
            if (routes[route]) {
                //DESIGN: Could have a config to set default duplicate route behavior. Overwrite or ignore or kill. Using ignore.
                console.warn("DUPLICATE ROUTE: '" + route + "'. The Controller '" + file + "' was not loaded because a previous controller is already using that route.");
            }
            else
                routes[route] = controller;
        });
    });

}

/**
 * Calls processRequest() after some request pre-processing.
 * @param request
 * @param response
 */
function preProcessRequest(request, response) {
    /*
     DESIGN: Creating a method agnostic params map for the request objectt.
     I have always believed that having separate GET/POST/whatever param stores was an anti-pattern
     as all data sent to a controller, no matter by what means, should be querieable from the same place.
     It is up to the developer to ensure they are not using the same names for their GET / POST(i.e. form) params.
     If there is a duplication, POST-ish params will win over, followed by URL-ish params (e.g. /path/:id ) which trumps all.
     */
    request.params = {};

    //Add GET params to request.params
    var getishquery = url.parse(request.url, true).query;
    if (typeof getishquery == 'object') request.params = getishquery;

    //If this request has post data, wait till it has finished streaming all the data before letting controllers deal with it.
    if (request.headers["content-length"]) {
        var body = "";
        request.on('data', function (chunk) {
            body += chunk;

            if (body.length > MAX_REQUEST_SIZE) {
                //Possible abuse. Kill connection if request too large.
                response.writeHead(413, {"Content-Type": "text/html"});
                response.write("Request Too Large");
                response.end();
                request.connection.destroy(); //Just to be sure.
            }
        });
        request.on('error', function (e) {
            console.error('problem with request: ' + e.message);
        });
        request.on('end', function () {
            //console.log('Finished reading request data...');
            /*
             DESIGN: Merge newly acquired POST-ish params with any GET-ish params. As mentioned above, This will overwrite any GET-ish params of same name.
             */
            body = qs.parse(body);
            for (var p in body) {
                request.params[p] = body[p];
            }

            //continue to request
            processRequest(request, response);
        });
    }
    else {
        processRequest(request, response);
    }
}

/**
 * Matches request routes to controllers.
 * @param request
 * @param response
 */
function processRequest(request, response) {
    //parse url
    var requrl = url.parse(request.url, true);
    var controller = routes[requrl.pathname];

    if (controller == undefined) {
        //No match found
        response.write("<h1>404: Not Found</h1>");
        response.end();
    }
    else {
        //Determine content-type
        var contentType = DEFAULT_CONTENT_TYPE;
        if (controller.contentType) contentType = controller.contentType();
        response.writeHead(200, {"Content-Type": contentType});

        //TODO: Determine id if it exists
        var id;

        //run controller action
        controller.action(request, response, id)
    }
}

/**
 * Start the server engine on a specific port.
 * @param port
 */
exports.start = function (options, port) {

    if (server != null) return;//Run only one instance of the server per VM
    if (port == null) port = 8443;

    try {
        setup();

        server = https.createServer(options, preProcessRequest);
        server.listen(port);
        console.log("Server Engine is listening on port " + port);
    }
    catch (err) {
        console.log(err);
    }
};