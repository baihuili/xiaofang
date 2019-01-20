var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["微型消防站", "现役和政府消防队", "消防水源"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    positons: [],
    markers1: [],
    markers2: [],
    markers3: [],
    scale: 12,
    markers: [],
    positonSelected: null,
    userType: null

  },
  onLoad: function() {
    var that = this;
    that.setData({
      userType: getApp().globalData.userInfo.userType
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    var markers1 = [];
    var markers2 = [];
    var markers3 = [];
    wx.request({
      url: getApp().globalData.server_url + 'small_xfResource_listAll.action',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {

        for (var index in res.data) {
          var pos = res.data[index];
          var type = pos.type;
          var resourceStatus = pos.resourceStatus;
          if (type == 1) {
            var callout = {};
            var marker = {};

            callout['content'] = pos.name;
            //	callout['display']='ALWAYS';
            callout['padding'] = 10;
            callout['borderRadius'] = 10;
            callout['bgColor'] = '#eeeeee';
            marker['id'] = pos.id;
            //	marker['callout']=callout;
            marker['latitude'] = pos.latitude;
            marker['longitude'] = pos.longitude;
            marker['iconPath'] = '/images/blue.png';
            markers1.push(marker);
          } else if (type == 2) {
            var callout = {};
            var marker = {};
            callout['content'] = pos.name;
            //callout['display']='ALWAYS';
            callout['padding'] = 10;
            callout['borderRadius'] = 10;
            callout['bgColor'] = '#eeeeee';
            marker['id'] = pos.id;
            //marker['callout'] = callout;
            marker['latitude'] = pos.latitude;
            marker['longitude'] = pos.longitude;
            marker['iconPath'] = '/images/blue.png';
            markers2.push(marker);
          } else if (type == 3 || type == 4) {
            var callout = {};
            var marker = {};
            callout['content'] = pos.name;
            // callout['display']='ALWAYS';
            callout['padding'] = 10;
            callout['borderRadius'] = 10;
            callout['bgColor'] = '#eeeeee';
            marker['id'] = pos.id;
            // marker['callout'] = callout;
            marker['latitude'] = pos.latitude;
            marker['longitude'] = pos.longitude;
            if (resourceStatus == 1) {
              marker['iconPath'] = '/images/blue.png';
            } else {
              marker['iconPath'] = '/images/yellow.png';
            }
            markers3.push(marker);
          }
        }

        that.setData({
          positons: res.data,
          markers: markers1,
          markers1: markers1,
          markers2: markers2,
          markers3: markers3,
          scale: 12
        });
      }
    })
  },
  tabClick: function(e) {
    console.log(e.currentTarget.id);
    var that = this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft


    });

    if (e.currentTarget.id == 0) {
      that.setData({
        markers: that.data.markers1,
        scale: 12
      });
    }
    if (e.currentTarget.id == 1) {
      that.setData({
        markers: that.data.markers2,
        scale: 12
      });
    }
    if (e.currentTarget.id == 2) {
      that.setData({
        markers: that.data.markers3,
        scale: 12
      });
    }

  },

  click: function(e) {
    console.log(e);
    var markerId = e.markerId;

    var that = this;
    for (var index in this.data.positons) {
      var pos = this.data.positons[index];
      if (markerId == pos.id) {
        that.setData({
          positonSelected: pos
        });
        break;
      }
    }

  },
  navigate: function() {
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.positonSelected.latitude),
      longitude: Number(that.data.positonSelected.longitude),
      scale: 18,
      name: that.data.positonSelected.name,
      address: that.data.positonSelected.position
    })
  },
  modifyPistion: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要修正为当前位置吗？',
      success: function(sm) {
        if (sm.confirm) {

          var myLocation = getApp().globalData.location;
          console.log(myLocation);

          wx.showToast({
            title: '正在提交...',
            icon: 'loading',
            mask: true,
            duration: 100000
          });
          var xfResource = {
            id: that.data.positonSelected.id,
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
          };
          //上传基本信息
          wx.request({
            url: getApp().globalData.server_url + 'small_xfResource_update_position.action',
            data: {
              'xfResource': xfResource,
              'user': getApp().globalData.userInfo
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: { // 设置请求的 header
              'content-type': 'application/json'
            },
            success: function(res) {
              var success = res.data.success;
              var message = res.data.message;
              wx.hideToast();
              wx.showModal({
                content: '修正成功',
                showCancel: false,
                success: function (res) {
                  that.onLoad();
                }
              });              
            },
            fail: function(res) {
              wx.hideToast();
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
});