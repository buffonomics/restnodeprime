/*
 A Self-contained model (or DAO) and datasource for Server Configurations.
 */
var msgs = require("../server/status");
var validator = require("../server/validator");

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
    var result = [];

    for (k, v in db) {

        //TODO: filtering and paging
        //OR...Do a sort-sensitive push to avoid sorting step
        result.push(v);
    }

    //TODO: sorting

    return result;
}

exports.create = function (params) {

    var rules = {"required": ["name", "hostname", "port", "username"]};
    var valid_dict = validator.sanitizeParams(rules, params);
    if (!valid_dict || typeof valid_dict == "string") {
        //not valid
        return messageUtil.error(valid_dict);
    }
    else if (db[valid_dict.name]) {
        //Treat config name as unique
        return messageUtil.error("A config with the name"+valid_dict.name+" already exists. Please use another name.");
    }
    else {
        db.push(valid_dict);
        return messageUtil.success(valid_dict);
    }

}

exports.delete = function (name) {
    //find and take out configuration named...
    delete db[name];
    return messageUtil.success(name+": deleted.");
}

exports.update = function (params) {
    var rules = {"required": ["name"], "optional": ["hostname", "port", "username"]};
    var valid_dict = validator.sanitizeParams(rules, params);

    if (!valid_dict || typeof valid_dict == "string") {
        //not valid
        return messageUtil.error(valid_dict);
    }
    var id = valid_dict.name;
    if (!db[id]){
        //cannot update if it doesn't exist
        return messageUtil.error(id +" not found. Cannot update.");
    }
    else
    {
        //all good
        db[id] = valid_dict;
        return messageUtil.success(id+" updated.");
    }
}