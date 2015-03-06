/**
 * Created by Deretor on 01.03.2015.
 */
var express = require('express');
var http = require('http');
var url = require('url');
var log = require('winston');
var path = require('path');
//var config = require('config');
//consoe.log(config);
var app = express();
app.set('port',3000);
app.set('host','127.0.0.1');
var server = new http.Server;
server.listen(app.get('port'),app.get('host'));
server.on('request',function(req,res){
    //res.end('Hello, my node');
    //console.log(req.headers);

    //console.log(req.method, req.url);
    var urlParsed = url.parse(req.url,true);
    log.debug(urlParsed);
    if(urlParsed.pathname === '/echo' && urlParsed.query.message)
    {
        //res.setHeader('Cache-control','no-cache');
        //res.statusCode=200;
        //res.end(urlParsed.query.message);
        ////console.log(urlParsed);
    }
    else{
        //res.statusCode=404;
        //res.end('Not found');
    }
});
