var express = require('express');
var router = express.Router();
var Firebird = require('node-firebird');
var bodyParser = require('body-parser');
var log = require('../libs/log')(module);
var session = require('express-session');
var fileRep =require('session-file-store')(session);
var configF = require('../config.js');
var path = require('path');
var iconv = require('iconv-lite');
var utf = require('utf8');
var ascIIJson=require('ascii-json');

var dbOptions = {
    host : 'localhost',
    port : 3050,
    database : path.join(__dirname, '../database/ktodb.fdb'),
    user : 'SYSDBA',
    password : 'masterkey'
};
var acces = function(queryObj){


};
//var baseAcces = require('../database/databaseConnect.js');
module.exports = function routs(app){

    /* GET home page. */






    router.get('/book',function(req, res) {
        res.render('bookIndex.ejs',{
            path: +'client'
        });
    });
    router.get('/',function(req, res) {
        res.render('loginPage.ejs',{
            path: +'client'
        });
    });
    var sessOpt={
        ttl: 3600
    };
    var buffParser=function(json){
        var copy = JSON.parse(json, function(key, value) {
            return value && value.type === 'Buffer'
                ? (new Buffer(value.data)).toString()
                : value;
        });

        log.info('jsonParsr ',copy);
        return copy;
    };
    app.use(session({
        secret: configF.session.secret,
        name: configF.session.key,
        resave : true,
        saveUninitialized: true,
        cookie : configF.session.cookie,
        store : new fileRep(sessOpt)
    }));
    var baseUrl = '/kto/req/';
    router.get(baseUrl+'checkUser',function(req, res ) {
        //log.info(req.method);
        //log.info(req.body);
        var queryObj ={
          sqlString : 'select * from STUDENT'
        };
        Firebird.attach(dbOptions, function(err, db){
            if(err)throw err;
                var resultA = [];
                log.info('db attach success');
                db.query(queryObj.sqlString,function(err,res){
                    if(err){log.error(err);}
                    db.detach();
                },function(err){if(err) throw err});
                    //log.info('db str : ',str);
                    db.on('result', function(result) {
                        // index === Number
                        //isObject === is row object or array?
                        log.info('db res : ',result);
                        log.info('db isAscii : ',ascIIJson.isAscii(result)  );
                        log.info('db isAsciiO : ',ascIIJson.stringify(result)  );
                        var obj = buffParser(ascIIJson.stringify(result));
                        log.info('db toString : ',result.toString()  );

                        resultA.push(obj);
                    });
                    db.on('detach', function(isPoolConnection) {
                        // isPoolConnection == Boolean
                        log.debug('db detuched');

                        res.end(JSON.stringify(resultA));
                    });



        });

        //var result = require('../database/databaseConnect.js')(queryObj);
        //log.info(resul);

        //res.end(result.res);


    });
    return router;
};




