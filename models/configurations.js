/*
 A Self-contained DAO and datasource for Server Configurations.
 */
var status = require("../server/utils/status");
var validator = require("../server/utils/validator");

//DESIGN: Datasource would/should be indexed by name in DB so...
var db = {
    "host1": {
        "name": "host1",
        "hostname": "nessus-ntp.lab.com",
        "port": "1241",
        "username": "toto"
    },
    "host2": {
        "name": "host2",
        "hostname": "nessus-xml.lab.com",
        "port": "3384",
        "username": "admin"
    }
};

/**
 *
 * @param options contains WHERE , PAGE, SORT_BY, and SORT_DIRECTION
 * @returns {*[]}
 */
exports.list = function (options) {
    var configs = [];

    for (k in db) {

        //TODO: filtering and paging
        //OR...Do a sort-sensitive push to avoid sorting step
        configs.push(db[k]);
    }

    //TODO: sorting

    //packaging
    var result = {"configurations": configs};
    return result;
}

exports.create = function (params) {

    var rules = {"required": ["name", "hostname", "port", "username"]};
    var validation_result = validator.sanitizeParams(rules, params);
    if (!validation_result || !validation_result.success) {
        //not valid
        return status.error(validation_result["message"],validation_result["code"]);
    }

    var valid = validation_result.result;
    if (db[valid.name]) {
        //Treat config name as unique
        return status.error("A config with the name '"+valid.name+"' already exists. Please use another name.");
    }
    else {
        db[valid.name]= valid;
        return status.success(valid);
    }

}

exports.delete = function (name) {
    //find and take out configuration named...
    delete db[name];
    return messageUtil.success(name+": deleted.");
}

exports.update = function (params) {
    var rules = {"required": ["name"], "optional": ["hostname", "port", "username"]};
    var validation_result = validator.sanitizeParams(rules, params);

    if (!validation_result || !validation_result.success) {
        //not valid
        return status.error(validation_result["message"],validation_result["code"]);
    }

    var valid = validation_result.result;
    if (!db[valid.name]){
        //cannot update if it doesn't exist
        return status.error(valid.name +" not found. Cannot update.");
    }
    else
    {
        //all good
        db[valid.name] = valid;
        return status.success(valid.name+" updated.");
    }
}