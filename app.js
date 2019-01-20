//app.js
App({
  onLaunch: function () {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法自动更新，请删除小程序重新下载。'
      })
    }

    // 本地存储
    this.globalData.login = wx.getStorageSync('login') || null
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null
    wx.getLocation({
      type: 'gcj02',
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
    // server_url: 'http://localhost:8080/xiaofang/'
  }
})