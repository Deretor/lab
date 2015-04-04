/**
 * Created by Deretor on 01.03.2015.
 */

    var fs    = require('fs');
    var nconf = require('nconf');
    var path = require('path');
    //console.log(path);
    nconf.argv()
        .env()
        .file({file: path.join(__dirname,'config.json')});

    console.log('port',nconf.get('port'));

var config={
    port:nconf.get('port'),
    host: nconf.get('host'),
    startFile: nconf.get('startFile'),
    session: nconf.get('session')
};


module.exports = config;