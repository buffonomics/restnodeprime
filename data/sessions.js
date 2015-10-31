var db={

}

exports.add=function(token, expires,ip){
    db[token] = {"token": token, "expires": expires, "active":true, "ip":ip};
}

exports.get=function(token){
    return db[token];
}

exports.invalidate = function(token){
    //DESIGN: Might want to keep session/IP history so just invalidate
    if(db[token]) {
        db[token].active = false;
    }
}