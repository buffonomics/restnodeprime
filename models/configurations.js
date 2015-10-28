/*
A Self-contained model and datasource for Server Configurations.
 */

var db = [
    {
        "name": "host1",
        "hostname": "nessus-ntp.lab.com",
        "port": "1241",
        "username": "toto"
    },
    {
        "name": "host2",
        "hostname": "nessus-xml.lab.com",
        "port": "3384",
        "username": "admin"
    }
];

exports.list=function(options){
    return db;
}