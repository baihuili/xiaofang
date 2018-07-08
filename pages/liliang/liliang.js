var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["消防微站", "市政消防队", "市政消防栓"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
	markers: [{
      title:'地图点',
      callout:{
        content:'消防微站\n负责人：张三\n电话：180000000\n',
        //color:'#ff0000',
        display: 'ALWAYS',
        padding:10,
        borderRadius:10,
        bgColor:'#eeeeee',
        
      },
     // iconPath: "/images/start.png",
     // id: 0,
      latitude: 19.621861960580546,
      longitude: 110.74978222747802
      //width: 50,
      //height: 50
    }, {
        name: '地图点2',
      color: "#FF0000DD",
      callout: {
        content: '消防微站\n负责人：张三\n电话：180000000',
        color: '#ff0000',
        display:'BYCLICK'
      },
     // iconPath: "/images/start.png",
     // id: 1,
      latitude: 19.61996205782531,
      longitude: 110.75102677246093,
      width: 50,
      height: 50
      }, {
        name: '地图点2',
        color: "#FF0000DD",
        callout: {
          content: '消防微站\n负责人：张三\n电话：180000000',
          color: '#ff0000',
          display: 'BYCLICK'
        },
        // iconPath: "/images/start.png",
        // id: 1,
        latitude: 19.619274853425637,
        longitude: 110.75810780426025,
        width: 50,
        height: 50
      }]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});