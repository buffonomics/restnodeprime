var configurations = require("../models/configurations")

/**
 * The route that leads to this controller.
 * @returns {string}
 */
exports.route = function(){
    return "/configs"
};


//Exports.
//DESIGN: Okay so this is going to be a fun one to explain. The thing with
exports.get = require("./configsList").get;
exports.post = require("./configsCreate").post;
exports.put = require("./configsUpdate").put;
exports.patch = require("./configsUpdate").patch;
exports.delete = require("./configsDelete").delete;