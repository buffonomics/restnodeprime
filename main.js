/**
 * ServerConfig Backend app Created by Iyobo Eki on 15-10-26.
 */

var engine = require("./server/engine"),
    fs = require("fs");

var options = {
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt')
};

console.log("Launching Iyobo Eki's Server Config REST API...");
engine.start(options);
