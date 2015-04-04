/**
 * Created by zarew_000 on 04.04.2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var Firebird = require('node-firebird');
var configF = require('../config.js');
var log = require('../libs/log')(module);
var caminte = require('caminte');
var path = require('path');
var iconv = require('iconv-lite');

module.exports = function(queryObj){
    var dbOptions = {
        host : 'localhost',
        port : 3050,
        database : path.join(__dirname, '/ktodb.fdb'),
        user : 'SYSDBA',
        password : 'masterkey'
    };
    var result = {};
    Firebird.attach(dbOptions, function(err, db){
        if(err){log.error(err);}
        else{
            log.info('db attach success');
            db.query(queryObj.sqlString,function(err,res){
                if(err){log.error(err);}
                else{
                    log.info('db res : ',res);
                    var str = iconv.decode(res, 'utf8');
                    log.info('db str : ',str);

                }
                db.detach();
            });
        }
    });
    return result;
};

