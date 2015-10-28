/**
 * Created by Iyobo on 15-10-27.
 */
var status = require("./status")
/**
 * Highly recommended to use this on all user/external param inputs. To ensures you are only getting relevant data.
 * Currently implemented rules are: required, and optional.
 *
 * Required: These attributes must exist in the params, otherwise declare the whole param input invalid.
 * Also helpfully notifies which attributes are missing.
 *
 * Optional: Besides the requireds, These attributes are the only other attributed permitted to exist in the sanitized params returned by this function.
 *
 * @example: {"required": ["name"], "optional": ["hostname", "port", "username"]}
 *
 * @param rules : A map of sanitization rules.
 * @param params : the params to be sanitized.
 * @returns : An object if validation passes, otherwise an error string.
 */
exports.sanitizeParams = function(rules,params){
    var result = {};

    //required rule step:

    var required = rules["required"];
    if(required) {
        var required_missing = "";
        for (i in required) {
            var attr = required[i];
            if (attr in params) {
                result[attr] = params[attr];
            }
            else {
                required_missing += " " + attr;
            }
        }

        //if invalid, Say the input is invalid and also what is missing
        if (required_missing != "")
            return status.error("Missing: " + required_missing);
    }

    //optional step: ..... Unimplemented/unneeded for challenge.
    var optional = rules["optional"];
    if(optional) {
        for (i in optional) {
            var attr = optional[i];
            result[attr] = params[attr];
        }
    }

    return status.success(result);
}

