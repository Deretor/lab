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
var Q = require('q');
var utf8 = require('utf8');
var _und = require("underscore");

var dbOptions = {
    host : 'localhost',
    port : 3050,
    database : path.join(__dirname, '../database/ktodb.fdb'),
    user : 'SYSDBA',
    password : 'masterkey'
};

//var baseAcces = require('../database/databaseConnect.js');
module.exports = function routs(app){

    /* GET home page. */






    router.get('/book.html',function(req, res) {
        res.render('bookIndex.ejs',{
            path: +'client'
        });
    });
    router.get('/',function(req, res) {
        //if
        res.render('loginPage.ejs',{
            path: +'client'
        });
    });
    var sessOpt={
        ttl: 3600
    };

    var accesDb=function(queryObj,dbOptions){
        var deferred = Q.defer();
        var buffParser=function(json){
            var copy = JSON.parse(json, function(key, value) {
                //if(value && value.type === 'Buffer'){
                //    if(ascIIJson.isAscii(value.data))
                //        console.info('ascII',new Buffer(value.data).toString('ascii'));
                //    else
                //        console.info('notASCII',new Buffer(value.data).toString());
                //}
                return value && value.type === 'Buffer'
                    ? (new Buffer(value.data,'windows-1251')).toString('windows-1251')
                    : value;
            });
            //var copy1 =utf8.encode(copy);
            //log.info('jsonParsr ',copy);
            //var copy1 =utf8.encode(copy);
            return copy;
        };

        Firebird.attach(dbOptions, function(err, db){


            if(err) {fail(err); log.error(err);}
            var resultA = [];
            log.info('db attach success');
            var success = function (data) {
                //console.log('success');
                deferred.resolve(data);
            };

            var fail = function (status) {
                deferred.reject(status);
            };
            db.query(queryObj.sqlString,function(err,res){
                if(err){log.error(err);}
                db.detach();
            },function(err){if(err) throw err});
            //log.info('db str : ',str);
            db.on('result', function(result) {

                var obj = buffParser(JSON.stringify(result));
                //console.log(obj);

                resultA=obj;
            });
            db.on('detach', function(isPoolConnection) {
                //console.log('ce',JSON.stringify(resultA));
                log.debug('db detuched');
                deferred.resolve(resultA);

            });
            db.on('error',function(err){
                console.log(err);
            })
        });
        return deferred.promise;
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
    router.get(baseUrl+'users',function(req, res ) {
        //log.info(req.method);
        //log.info(req.body);
        var queryObj ={
          sqlString : 'select * from STUDENTS1'
        };
        //console.log('de');
        accesDb(queryObj,dbOptions).then(function(result){
            //console.log('de',result);
            res.header('charset','windows-1251');
            res.send(result);
            res.end();
        }).
        fail(function(err){
                console.log('err',err);
                res.end();
        });
    });
    router.post(baseUrl+'checkUser',function(req, res ) {
        //log.info(req.method);
        log.info(req.body);
        var id=req.body.login;
        var pass=req.body.password;
        var queryObj ={
            sqlString : 'select UID, PASSWORD, ROLE  from STUDENTS1 where UID='+Firebird.escape(id)
        };
        console.log(queryObj.sqlString);
        accesDb(queryObj,dbOptions).then(function(result){
            console.log(result);
            if(result.length == 0){
                //console.log('aaa');
                var sess = req.session;
                sess.authrized = false;
                sess.role = result[0].role || 'access denied';
                res.send({'autorize': String(sess.authrized), 'role':sess.role})
                return;
            }
            log.info('ress ',result[0].password.slice(0,result[0].password.length-4));
            if(result[0].uid == id && result[0].password.slice(0,result[0].password.length-4) == pass)
            {
                sess = req.session;
                sess.authrized = true;
                sess.role = result[0].role || 'access denied';
                //res.redirect('/app');
            }
            else{
                var sess = req.session;
                sess.authrized = false;
            }
            //console.log('de',res);
            //res.header('charset','windows-1251');
            log.info({'autorize': String(sess.authrized), 'role':sess.role});
            //if(sess.autorize == 'true'){}

            if(String(sess.authrized) == 'true'){res.send({'autorize': String(sess.authrized), 'role':sess.role}); res.end();}
            else{
                res.send({'autorize': String(sess.authrized), 'role':sess.role});
                res.end();
            }

        }).
            fail(function(err){
                console.log('err',err);
                res.end();
            });
    });
    router.get('/app',function(req,res){
        var dataA = isAuth(req);
        console.log(56);
        if(dataA.autorize == 'true'){
            switch (dataA.role){
                case 'student': res.send(501,'Access denied');
                    break;
                case 'teacher' : res.render('checkApp.ejs');
            }
        }
        else{
            res.location('/');
        }
        res.end();
    });
    router.get('/teacherPage',function(req,res){
       res.render('teacherIndex.ejs');
        res.end();
    });
    router.get(baseUrl+'isAut',function(req, res ) {
        var resul=isAuth(req);
        //console.log(resul);
        res.send(resul);
        res.end();
    });
    function isAuth(req){
        if(!req.session.authrized){req.session.authrized=false};
        var role = req.session.role || 'access denied';
        //console.log(req.session);
        return {"autorize":String(req.session.authrized),"role":role};
    }
    router.get(baseUrl+'testQ',function(req,res){
        var testQ,tests,quest;
        var res123=[];
        var queryObj={};
        queryObj.sqlString = 'select * from TESTS';
        accesDb(queryObj,dbOptions).then(function(result){
            //console.log('de',result);
            tests = result;
            res.header('charset','windows-1251');
            //res.send(tests);
            //res.end();
            queryObj.sqlString = 'select * from TEST_QUESTION';
            accesDb(queryObj,dbOptions).then(function(result){
                //console.log('de',result);
                testQ = result;
                //res.header('charset','windows-1251');
                //res.send(testQ);
                queryObj.sqlString = 'select * from QUESTIONS';
                accesDb(queryObj,dbOptions).then(function(result){
                    //console.log('de',result);
                    quest = result;
                    //res.header('charset','windows-1251');
                    //res.send(quest);
                    for(var i=0;i<tests.length;i++){
                        var rs={
                          tid: tests[i].tid,
                            theme: tests[i].theme,
                            questionsI: [],
                            questions:[]
                        };
                        //console.log('aaaaa');
                        //console.log(rs);
                        //console.log(testQ);
                        for(var j=0;j<testQ.length;j++){
                            console.log(testQ[j].tid);
                            if(tests[i].tid == testQ[j].tid){
                                log.info(tests[i].tid == testQ[j].tid);
                                log.info( testQ[j].qid);
                                log.info( rs.questionsI);
                                rs.questionsI.push(testQ[j].qid);
                            }
                        }
                        //console.log('bbbbb');
                        for(var j=0;j<quest.length;j++){
                            if(rs.questionsI.indexOf(quest[j].qid) != -1 ){
                                rs.questions.push(quest[j]);
                            }
                        }

                       res123.push(rs);
                    }
                    //log.info('res123 ',res123);
                    res.header('charset','windows-1251');
                    res.send(res123);
                    res.end();
                }).fail(function(err){
                    throw err;
                });
            }).fail(function(err){
                throw err;
            });
        }).fail(function(err){
            throw err;
        });
    });

    function equal( firstObj, secondObject ){
        var keysFirstObj = Object.keys( firstObj );
        var keysSecondObject = Object.keys( secondObject );
        if ( keysFirstObj.length != keysSecondObject.length ) {
            return false;
        }
        return !keysFirstObj.filter(function( key ){
            if ( typeof firstObj[key] == "object" ||  Array.isArray( firstObj[key] ) ) {
                return !Object.equal(firstObj[key], secondObject[key]);
            } else {
                return firstObj[key] !== secondObject[key];
            }
        }).length;
    }


    router.get(baseUrl+'userT',function(req,res){
        var userT,users,resD;
        var res123=[];
        var queryObj={};
        queryObj.sqlString = "select * from STUDENTS1 where ROLE = 'student'";
        accesDb(queryObj,dbOptions).then(function(result){
            //console.log('de',result);
            users = result;
            //res.header('charset','windows-1251');
            //res.send(tests);
            //res.end();
            queryObj.sqlString = 'select * from USER_TEST';
            accesDb(queryObj,dbOptions).then(function(result){
                //console.log('de',result);
                userT = result;
                //res.header('charset','windows-1251');
                //res.send(testQ);
                queryObj.sqlString = 'select * from STUD_RES_D';
                accesDb(queryObj,dbOptions).then(function(result){
                    //console.log('de',result);
                    resD = result;
                    //res.header('charset','windows-1251');
                    //res.send(quest);
                    for(var i=0;i<users.length;i++){
                        var rs={
                            sid: users[i].uid,
                            fio: users[i].fio,
                            group: users[i].group,
                            testsI: [],
                            tests:[]
                        };
                        //console.log('aaaaa');
                        //console.log(rs);
                        //console.log(testQ);
                        for(var j=0;j<userT.length;j++){
                            //console.log(userT[j].uid);
                            if(users[i].uid == userT[j].sid){

                                rs.testsI.push(userT[j].tid);
                            }
                        }
                        //console.log('bbbbb');
                        var resP=[];
                        var testO = {
                            tid:'',
                            markS: '',
                            questions:[]
                        };

                        for( j=0;j<resD.length;j++){
                            if(rs.testsI.indexOf(resD[j].tid) != -1 && resD[j].sid==rs.sid){
                                resP.push(resD[j]);
                            }
                        }
                        //console.log('resP',resP);
                        for(j=0;j<rs.testsI.length;j++){
                            //rs.tests[j]=[];
                            for(var jn=0;jn<rs.testsI.length;jn++){
                                rs.tests[j]={tid: rs.testsI[j],
                                    markS: 0,
                                    markM: 0,
                                    questions:[]};
                            }

                            console.log('rs.tests.length;',rs.tests.length);
                            for(var k=0;k<resP.length;k++)
                            {
                                for(var jn2=0;jn2<rs.tests.length;jn2++){

                                    console.log(jn2,' jn  ',rs.tests[jn2],resP[k].tid);

                                    if(rs.tests[jn2].tid == resP[k].tid)
                                    {
                                       rs.tests[jn2].markS =  0;
                                       rs.tests[jn2].markM =  0;
                                        rs.tests[jn2].questions.push(resP[k]);
                                        rs.tests[jn2].questions=_und.uniq(rs.tests[jn2].questions);
                                        _und.each(rs.tests[jn2].questions,function(obj){
                                            rs.tests[jn2].markS = rs.tests[jn2].markS+obj.smark;
                                            rs.tests[jn2].markM = rs.tests[jn2].markS+obj.mmark;
                                        });
                                        //_und.sortBy(rs.tests[jn2].questions);
                                        //quid1.push(resP[k].qid);
                                    }
                                }

                            }

                        }
                        //for(j=0;j<rs.tests.length;j++){
                        //    var rests= rs.tests[j];
                        //    for(var kn=0;kn<rests[i].questions;kn++){
                        //        for(var kt=rests[i].questions-1;kt>=0;kt--){
                        //            if(equal(kn<rests[i].questions[kn],kn<rests[i].questions[kt])){
                        //                rests[i].questions.splice(kt,1);
                        //            }
                        //        }
                        //
                        //    }
                        //}
                        res123.push(rs);
                    }
                    log.info('res123 ',res123);
                    res.header('charset','windows-1251');
                    res.send(res123);
                    res.end();
                }).fail(function(err){
                    throw err;
                });
            }).fail(function(err){
                throw err;
            });
        }).fail(function(err){
            throw err;
        });
    });

    router.get(baseUrl+'questions',function(req,res){
        var queryObj={};
        queryObj.sqlString = 'select * from questions';
        accesDb(queryObj,dbOptions).then(function(result){
            //console.log('de',result);
            res.header('charset','windows-1251');
            res.send(result);
            res.end();
        }).
            fail(function(err){
                throw err;
            });
    });
    return router;
};




