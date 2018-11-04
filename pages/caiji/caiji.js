Page({
  data: {
    navItems: [],
    curNav: 999990,
    toView: 999990,
    myLocation: null,
    btnDisabled: true,
    btnType: 'primary'
  },
  onLoad: function () {
    this.setData({
      myLocation: getApp().globalData.location

    });

    var that = this
    wx.request({
      url: getApp().globalData.server_url + 'small_question_list.action',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {

        that.setData({
          navItems: res.data
        })
      }
    })

  },

  //事件处理函数
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值
    let index = e.target.dataset.index;
    this.setData({
      toView: "v" + index,
      curNav: index
    })
  },
  scrollRight: function (e) {

    // let scrollTop = e.detail.scrollTop;
    // var scrollNav = Math.round(scrollTop / this.data.viewHeight);
    //  this.setData({
    //   // curNav: scrollNav
    // })
  },

  optionChange: function (e) {
    let index = e.target.dataset.index;
    let val = e.detail.value;

    var up = "navItems[" + index + "].optionSelect";
    this.setData({
      [up]: [val]
    });


  },
  resultChange: function (e) {
    var result = e.detail.value;
    if (result == 1) {
      this.setData({
        btnType: 'primary',
        btnDisabled: false
      });
    } else {
      this.setData({
        btnType: 'warn',
        btnDisabled: false
      });
    }
  },
  chooseImage: function (e) {
    var that = this;
    let index = e.target.dataset.index;
    var files = that.data.navItems[index].files;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(files);
        files = files.concat(res.tempFilePaths);

        var up = "navItems[" + index + "].files";
        that.setData({
          [up]: files
        });
      }
    })
  },
  previewImage: function (e) {
    let index = e.target.dataset.index;
    var files = this.data.navItems[index].files;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: files // 需要预览的图片http链接列表
    })
  },
  spliceImage: function (e) {
    var that = this;
    let index = e.target.dataset.index;
    var files = that.data.navItems[index].files;
    files.splice(e.currentTarget.dataset.image_index, 1);
    console.log(files);
    var up = "navItems[" + index + "].files";
    that.setData({
      [up]: files
    });
  },
  submitPage: function (e) {
    var that = this;
    var data = e.detail.value;
    this.setData({
      btnDisabled: true
    });
    wx.showToast({
      title: '正在提交...',
      icon: 'loading',
      mask: true,
      duration: 100000
    });
    //上传基本信息
    wx.request({
      url: getApp().globalData.server_url + 'small_collectResult_save.action',
      data: {
        'collectResult': data,
        'user': getApp().globalData.userInfo
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { // 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {

        var success = res.data.success;
        var message = res.data.message;


        if (success) {
          that.submitAnswer(res.data.id);
        } else {
          wx.hideToast();
          this.setData({
            btnDisabled: false
          });
          wx.showModal({
            content: message,
            showCancel: false,
            success: function (res) { }
          });
        }
      },
      fail: function (res) {
        wx.hideToast();
      }
    })

  },
  submitAnswer: function (resultId) {
    var that = this;

    //上传基本信息
    wx.request({
      url: getApp().globalData.server_url + 'small_question_collect.action',
      data: {
        'questionList': that.data.navItems,
        'resultId': resultId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { // 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {

        var success = res.data.success;
        var message = res.data.message;


        if (success) {
          that.submitPic(res.data.answerIdList, resultId);
        } else {
          wx.hideToast();
          this.setData({
            btnDisabled: false
          });
          wx.showModal({
            content: message,
            showCancel: false,
            success: function (res) { }
          });
        }
      },
      fail: function (res) {
        wx.hideToast();
        console.log('cuowu' + ':' + res)
      }
    })
  },
  submitPic: function (answerIdList, resultId) {
    var that = this;

    var navItems = this.data.navItems;
    that.submitOnePic( resultId, navItems, 0, 0);
  
  },
  submitOnePic:function(resultId, navItems,i,j){
    var that = this;
    
    var pics = navItems[i].files;
    
    if(pics.length==0){
      if (i < navItems.length - 1){
        that.submitOnePic(resultId, navItems, i + 1, 0);
      }else{
        that.doSuccess();
      }
    }else{
 
      wx.uploadFile({
        url: getApp().globalData.server_url + 'small_resultPicture_save.action',
        filePath: pics[j],
        name: 'uploadImage',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
        },
        formData: {
          'resultPicture.resultId': resultId,
          'resultPicture.questionId': navItems[i].id
        },
        success: function (res) {
          if (i < navItems.length - 1) {
            if (j < pics.length - 1) {
              that.submitOnePic(resultId, navItems, i, j + 1);
            } else {
              that.submitOnePic(resultId, navItems, i + 1, 0);
            }
          } else {
            that.doSuccess();
          }

        },
        fail: function (res) {
          console.log(res);
          wx.hideToast();
          that.setData({
            btnDisabled: false
          });
          console.log('fail');

        },
      })
    }
    
  },
  doSuccess:function(){
    var that=this;
    wx.hideToast();
    this.setData({
      btnDisabled: false
    });
    wx.showModal({
      content: '采集成功',
      showCancel: false,
      success: function (res) {
        that.onLoad();
      }
    });
  }


})