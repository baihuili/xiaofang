//app.js
App({
  onLaunch: function () {
    // 本地存储
    this.globalData.login = wx.getStorageSync('login') || null
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null
    wx.getLocation({
      success: res => {
       // console.log(res);
        this.globalData.location=res;
      },
    })
  },
  globalData: {
    url:'',
    login:null,//是否已经登录
    userInfo: null,
    location:null,
    server_url:'https://wenchang.119hn.com/'
  }
})