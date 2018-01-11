exports.init = function (app) {
    var wechat_cfg = require('../config/wechat.cfg');
    var http = require('http');
    var cache = require('memory-cache');
    var sha1 = require('sha1'); //签名算法
    //var url = require('url');
    var signature = require('../sign/signature');
    var check_sign = require('../sign/check_sign');

    var url;
    app.get('/b', function (req, res) {
        url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
        //var url = req.protocol + '://' + req.host + req.path;
        res.sendfile('./vtour/tour.html');
    });
    app.get('/j', function (req, res) {
        url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
        //var url = req.protocol + '://' + req.host + req.path;
        res.sendfile('./jiaxiao/index.html');
    });
    // app.get('/t', function (req, res) {
    //     url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    //     //var url = req.protocol + '://' + req.host + req.path;
    //     res.sendfile('./vtour/tour.html');
    // });
    app.get('/check', function (req, res) {
        check_sign.Sign(url, function (ret) {
            ret.appId = wechat_cfg.appid;
            console.log(ret);
            res.send(ret);
        });
        /*signature.sign(url, function (signatureMap) {
         signatureMap.appId = wechat_cfg.appid;
         res.send(signatureMap);
         });*/

    })

};
