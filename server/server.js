/**
 * Created by Deretor on 01.03.2015.
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var log = require('winston');
var express = require('express');
var Firebird = require('node-firebird');
var configF = require('./config.js');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var conect = require('connect');

var users = require('./routes/users');
var ejs = require('ejs');
var log = require('./libs/log')(module);

//var caminte = require('caminte');
//log.info(Firebird);
//log.info(caminte);
var caminte = require('caminte');
var CaminteStore = require('connect-caminte')(session);
var app = express();
var routs = require('./routes/index')(app);

//var dbOptions = {
//    host : 'localhost',
//port : 3050,
//database : path.join(__dirname, '/database/KTODB.FDB'),
//user : 'SYSDBA',
//password : 'masterkey'
//};
//var Schema = caminte.Schema;



//var camintS = new CaminteStore(db);
//console.log('aaa',camintS);
//var schema = new Schema(db.driver, db);
//Firebird.attach(dbOptions, function(err, db){
//    if(err){log.error(err);}
//    else{
//
//    }
//});
//log.info(schema);

//app.set('database engine', Firebird);
app.set('port',configF.port);
app.set('host',configF.host);

http.createServer(app).listen(configF.port,function(){
    log.info('express server listening on port '+configF.port);
});
app.engine('ejs',require('ejs-locals'));
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon/favicon.ico'));

if(app.get('env')=='development'){app.use(logger('dev'));}
else{app.use(logger('default'));}

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//app.get('/', function(req, res){
//    var sess = req.session;
//    if (sess.views) {
//        log.info(sess.views);
//        sess.views++;
//        log.info(sess.views);
//        res.end('<p>views: ' + sess.views + '</p>'
//        + '<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
//        console.log('aaa')
//
//    } else {
//        sess.views = 1;
//        console.log('bbb')
//        res.end('welcome to the session demo. refresh!');
//
//    }
//    console.log(sess);
//    //next();
//});
app.use(routs);
app.use(express.static(path.join(__dirname, 'public')));




//// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//
//// production error handler
//// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;

