//noinspection JSAnnotator
/**
 *  以下内容多摘自官方demo
 *
 **/
$(document).ready(function () {
    var appId;
    var timestamp;
    var nonceStr;
    var signature;
    $.ajax({
        url: '/check',
        type: 'get',
        dataType: 'json',
        timeout: 1000,
        success: function (data, status) {
            console.log(data)
            appId = data.appId;
            timestamp = data.timestamp;
            nonceStr = data.nonceStr;
            signature = data.signature;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ] // 必填，需要使用的JS接口列表，
            });
        },
        fail: function (err, status) {
            console.log(err)
        }
    })

});

wx.ready(function () {
    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
        jsApiList: [
            'getNetworkType',
            'previewImage'
        ],
        success: function (res) {
            
        }
    });

    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
        title: '金沙物流园B区全景',
        desc: '免租费,免物业管理费,免暖气费,免停车费',
        link: 'http://3d.wwjswl.com',
        imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
        trigger: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
    });
    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
        title: '金沙物流园B区全景',
        desc: '免租费,免物业管理费,免暖气费,免停车费',
        link: 'http://3d.wwjswl.com',
        imgUrl: 'http://3d.wwjswl.com/share/timg.png',
        trigger: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
    });
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
        title: '金沙物流园B区全景',
        desc: '免租费,免物业管理费,免暖气费,免停车费',
        link: 'http://3d.wwjswl.com',
        imgUrl: 'http://3d.wwjswl.com/share/timg.png',
        trigger: function (res) {
        },
        complete: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
    });

    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
        title: '金沙物流园B区全景',
        desc: '免租费,免物业管理费,免暖气费,免停车费',
        link: 'http://3d.wwjswl.com',
        imgUrl: 'http://3d.wwjswl.com/share/timg.png',
        trigger: function (res) {
        },
        complete: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
    });

});