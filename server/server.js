/**
 * Created by Deretor on 01.03.2015.
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var log = require('winston');
var Firebird = require('node-firebird');
var configF = require('./config.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs');
//var session = require('express-session');
var log = require('./libs/log')(module);
log.info(configF);
var app = express();
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

//app.use(session({
//    secret: '',
//    name: '',
//    //store: sessionStore, // connect-mongo session store
//    proxy: true,
//    resave: true,
//    saveUninitialized: true
//}));



//app.use('/users', users);

        app.route('/book').get(function(req, res) {
        res.render('bookIndex.ejs',{
            path: +'client'
        });
    });
app.route('/').get(function(req, res) {
    res.render('loginPage.ejs',{
        path: +'client'
    });
});
app.use('/', routes);

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

//
//app.use(function(req,res,next){
//    if(req.url == '/')
//        res.end('hello');
//    else{
//        next();
//    }
//});
//app.use(function(req,res){
//    res.send(404,'pageNotFound');
//});
//app.use(function(err,req,res,next){
//    var code = err.message;
//    switch(code){
//        case 404 : res.send(404, 'page not found');
//            break;
//        case  403 : res.send(403, 'acces denied');
//    }
//});




//
//module.exports = app;

