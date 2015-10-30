/**
 * Created by Admin on 15-10-30.
 */

/**
 * DESIGN: User table indexed by username. Naturally, the passwords would not be stored as strings,
 * but would instead be bcrypted. Using strings here so challenge tester can readily see/login
 * with user credentials.
 */
var db = {
    "hitman": {
        username: "hitman",
        password: "Agent47"
    },
    "cake": {
        username: "cake",
        password: "Lie443"
    },
    "popeye": {
        username: "popeye",
        password: "SpinachLover123"
    }
};

exports.get=function(username){
    return db[username];
}

exports.authenticate = function(username, password)
{
    return (db[username] && db[username].password==password);
}