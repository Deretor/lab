/**
 * Created by Deretor on 01.03.2015.
 */
var config = require('nconf');
var path = require('path');

config.argv()
    .env()
    .file({file: path.join(__dirname,'config.json')});

module.exports = config;