var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },        
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '文城镇',
                data: 15,
            }, {
                name: '锦山镇',
                data: 35,
            }, {
                name: '抱罗镇',
                data: 78,
            }, {
                name: '翁田镇',
                data: 63,
            }, {
                name: '东阁镇',
                data: 35,
            }, {
                name: '潭牛镇',
                data: 78,
            }, {
                name: '东路镇',
                data: 63,
            }, {
                name: '东阁镇',
                data: 35,
            }, {
                name: '文教镇',
                data: 78,
            }, {
                name: '东郊镇',
                data: 78,
            }],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
    }
});