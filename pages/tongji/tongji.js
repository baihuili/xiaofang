var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  data: {
    collectDatas: null
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onShow: function (e) {
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    wx.request({
      url: getApp().globalData.server_url + 'small_collectResult_analysis_wx.action',
      method: 'POST',
      data: { 'user': getApp().globalData.userInfo },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          collectDatas: res.data
        });
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'canvas',
          type: 'column',
          categories: res.data.categories,
          series: [{

            name: '采集数量',

            data: res.data.dataShow

          }],
          width: windowWidth,
          height: 300
        });
      }
    });


  }
});