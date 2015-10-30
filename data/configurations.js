/*
 A Self-contained DAO and datasource for Server Configurations.
 */
var status = require("../server/utils/status");
var validator = require("../server/utils/validator");

//DESIGN: Datasource should really be indexed by name in DB so...
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
    },
    "host3": {
        "name": "host3",
        "hostname": "nessus-ntp.lab2.com",
        "port": "1241",
        "username": "toto"
    },
    "host4": {
        "name": "host4",
        "hostname": "nessus-xml.lab2.com",
        "port": "3384",
        "username": "admin"
    },
    "host5": {
        "name": "host5",
        "hostname": "nessus-xml.lab3.com",
        "port": "3384",
        "username": "admin"
    }
};

/**
 *
 * @param options contains where , page and sort
 * @returns {*[]}
 */
exports.list = function (params) {
    var configs = [];
    var metadata = {};

    var limit = params["limit"] ? parseInt(params["limit"]) : 4;
    var page = params["page"] ? parseInt(params["page"]) : 1;
    if (page < 1) page = 1;

    //Filtering
    var filterValidationRules = {"optional": ["name", "hostname", "port", "username"], "fillOptional": false};
    var valid = validator.sanitizeParams(filterValidationRules, params);
    if (valid && valid.result) {
        var filters = valid.result;
        for (k in db) {
            var item = db[k];
            var allowed = true;
            for (f in filters) {
                if (filters[f] && item[f] != filters[f]) allowed = false;
            }

            if (allowed) configs.push(item);
        }
    }
    else {
        for (k in db) {
            configs.push(db[k]);
        }
    }
    metadata["total"] = configs.length
    metadata["totalPages"] = Math.ceil(configs.length / limit);

    //Sorting
    var sort = params["sort"];
    if (sort) {
        metadata["sort"] = sort
        //Determine direction i.e. name (asc) or -name (desc)
        var sort_asc = true;
        if (sort.indexOf("-") === 0) {
            sort_asc = false; // descending
            sort = sort.substring(1); //remove dash now that we know direction
        }

        //Do sort
        configs.sort(function compare(a, b) {
            if (a[sort] < b[sort])
                return sort_asc ? -1 : 1;
            if (a[sort] > b[sort])
                return sort_asc ? 1 : 1;
            return 0;
        })

    }

    //Paging
    configs = configs.slice((page - 1) * limit, page * limit);
    metadata["count"] = configs.length;
    metadata["page"] = page;
    metadata["limit"] = limit;

    //packaging
    var result = {"configurations": configs, "metadata": metadata};
    return result;
}

exports.create = function (params) {

    var rules = {"required": ["name", "hostname", "port", "username"]};
    var validation_result = validator.sanitizeParams(rules, params);
    if (!validation_result || !validation_result.success) {
        //not valid
        return status.error(validation_result["message"], validation_result["code"]);
    }

    var valid = validation_result.result;
    if (db[valid.name]) {
        //Treat config name as unique
        return status.error("A config with the name '" + valid.name + "' already exists. Please use another name.");
    }
    else {
        db[valid.name] = valid;
        return status.success(valid);
    }

}

exports.delete = function (name) {
    //find and take out configuration named...
    delete db[name];
    return status.success(name + ": deleted.");
}

exports.update = function (params, partial) {
    var rules = {"required": ["name"], "optional": ["hostname", "port", "username"]};

    if (partial) rules["fillOptional"] = false;

    var validation_result = validator.sanitizeParams(rules, params);

    if (!validation_result || !validation_result.success) {
        //not valid
        return status.error(validation_result["message"], validation_result["code"]);
    }

    var valid = validation_result.result;
    if (!db[valid.name]) {
        //cannot update if it doesn't exist
        return status.error(valid.name + " not found. Cannot update.");
    }
    else {
        if (partial) {
            //Update only what was requested
            for (v in valid){
                db[valid.name][v] = valid[v];
            }
        }
        else {
            //Do full update
            db[valid.name] = valid;
        }
        return status.success(valid.name + " updated.");
    }
}