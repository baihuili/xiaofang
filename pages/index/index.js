Page({
  data: {
    userInfo: {
      id: null,
      username: '',
      password: '',
      userRealName: '',
      secrect: ''
    },
    login: null,
    logBtnDisable: false,
    loading: false
  },
  onLoad:function(){
    this.setData({
      userInfo: getApp().globalData.userInfo,
      login: getApp().globalData.login
    });

    if (true == this.data.login) {
    } else {
      wx.hideTabBar({
      })
    }
  },

  // 获取输入账号 
  phoneInput: function (e) {
    var up = "userInfo.username";
    this.setData({
      [up]: e.detail.value
    });
    console.log(e.detail.value);
  },

  // 获取输入密码 
  passwordInput: function (e) {
    var up = "userInfo.password";
    this.setData({
      [up]: e.detail.value
    });
  },

  // 登录 
  login: function () {
    if (this.data.userInfo==null || this.data.userInfo.username.length == 0 || this.data.userInfo.password.length == 0) {
      wx.showModal({
        content: '用户名和密码不能为空',
        showCancel: false
      });
    } else {
      var that = this;
      that.setData({
        logBtnDisable: true,
        loading: true
      });

      wx.request({
        url: getApp().globalData.server_url + 'small_login.action',
        method: "POST",
        data: { 'sysuser': that.data.userInfo },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            logBtnDisable: false,
            loading: false
          });
          if (res.data.success) {
            var id = "userInfo.id";
            var secrect = "userInfo.secrect";
            var userRealName = "userInfo.userRealName";
            var password = "userInfo.password";
            var userType = "userInfo.userType";
            var orgId = "userInfo.sysorganization.id";
            that.setData({
              [id]: res.data.id,
              [secrect]: res.data.secrect,
              [userRealName]: res.data.userRealName,
              [password]: null,
              [userType]: res.data.userType,
              [orgId]: res.data.sysorganizationId,
              ['login']: true
            });

            getApp().globalData.userInfo = that.data.userInfo;

            wx.setStorageSync('login', true);
            wx.setStorageSync('userInfo', that.data.userInfo);
            wx.showTabBar({              
            });
          } else {
            wx.showModal({
              content: '用户名、密码错误',
              showCancel: false
            });
          };
        },
        error: function (res) {
          that.setData({
            logBtnDisable: false,
            loading: false
          });
        }
      })
    }
  },
  logout: function () {
    this.setData({
      userInfo: null,
      login: false
    });
    wx.setStorageSync('login', false);
    wx.setStorageSync('userInfo', null);
    wx.hideTabBar({
      
    });
  }
})