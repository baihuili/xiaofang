//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getLocation({
      success: res => {
       // console.log(res);
        this.globalData.location=res;
         console.log(this.globalData.location);
      },
    })
  },
  globalData: {
    url:'',
    userInfo: null,
    location:null
  }
})