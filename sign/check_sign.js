var sign = require('./sign.js'),
    cache = require('memory-cache'),
    sha1 = require('sha1'),
    config = require('../config/wechat.cfg'),
    request = require('request');
// var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
exports.Sign = function (url, callback) {

    if (cache.get('ticket')) {
        jsapi_ticket = cache.get('ticket');

    } else {
        request(config.accessTokenUrl + '?grant_type=' + config.grant_type + '&appid=' + config.appid + '&secret=' + config.secret, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var tokenMap = JSON.parse(body);
                    request(config.ticketUrl + '?access_token=' + tokenMap.access_token + '&type=jsapi', function (error, resp, json) {
                        if (!error && response.statusCode == 200) {
                            var ticketMap = JSON.parse(json);
                            cache.put('ticket', ticketMap.ticket, config.cache_duration);  //加入缓存
                            console.log('jsapi_ticket=' + ticketMap.ticket);
                            sign(ticketMap.ticket, url, function (ret) {
                                console.log(ret);
                                callback(ret)
                            });
                        }
                    })
                }
            }
        )
    }
}
;


// console.log();
/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */
