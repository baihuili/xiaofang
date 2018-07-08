Page({
  data: {
    navItems: [{"id":1,"short_title":"灭火器","files":[],"title":"灭火器","status":1,"optionSelect":[],"type":1,"optionList":[{"val":1,"id":1,"title":"未设置","questionId":1,"status":1,"orders":"","keyWord":""},{"val":10,"id":2,"title":"完好有效","questionId":1,"status":1,"orders":"","keyWord":""},{"val":3,"id":3,"title":"失效","questionId":1,"status":1,"orders":"","keyWord":""},{"val":3,"id":4,"title":"缺少","questionId":1,"status":1,"orders":"","keyWord":""},{"val":3,"id":5,"title":"配置类型错误","questionId":1,"status":1,"orders":"","keyWord":""},{"val":6,"id":6,"title":"设置位置不当","questionId":1,"status":1,"orders":"","keyWord":""}]},{"id":2,"short_title":"疏散通道","files":[],"title":"疏散通道","status":1,"optionSelect":[],"type":1,"optionList":[{"val":10,"id":7,"title":"畅通","questionId":2,"status":1,"orders":"","keyWord":""},{"val":6,"id":8,"title":"堵塞","questionId":2,"status":1,"orders":"","keyWord":""},{"val":3,"id":9,"title":"锁闭","questionId":2,"status":1,"orders":"","keyWord":""}]},{"id":3,"short_title":"安全出口","files":[],"title":"安全出口","status":1,"optionSelect":[],"type":1,"optionList":[{"val":10,"id":10,"title":"畅通","questionId":3,"status":1,"orders":"","keyWord":""},{"val":6,"id":11,"title":"堵塞","questionId":3,"status":1,"orders":"","keyWord":""},{"val":3,"id":12,"title":"锁闭","questionId":3,"status":1,"orders":"","keyWord":""},{"val":0,"id":13,"title":"缺少","questionId":3,"status":1,"orders":"","keyWord":""}]},{"id":4,"short_title":"疏散标志","files":[],"title":"疏散指示标志","status":1,"optionSelect":[],"type":1,"optionList":[{"val":10,"id":14,"title":"完好有效","questionId":4,"status":1,"orders":"","keyWord":""},{"val":6,"id":15,"title":"损坏","questionId":4,"status":1,"orders":"","keyWord":""},{"val":3,"id":16,"title":"缺少","questionId":4,"status":1,"orders":"","keyWord":""},{"val":0,"id":17,"title":"无","questionId":4,"status":1,"orders":"","keyWord":""}]},{"id":5,"short_title":"应急照明","files":[],"title":"应急照明","status":1,"optionSelect":[],"type":1,"optionList":[{"val":10,"id":18,"title":"完好有效","questionId":5,"status":1,"orders":"","keyWord":""},{"val":6,"id":19,"title":"损坏","questionId":5,"status":1,"orders":"","keyWord":""},{"val":3,"id":20,"title":"缺少","questionId":5,"status":1,"orders":"","keyWord":""},{"val":0,"id":21,"title":"无","questionId":5,"status":1,"orders":"","keyWord":""}]},{"id":6,"short_title":"障碍物","files":[],"title":"人员密集场所外墙门窗上是否设置影响逃生、灭火救援的障碍物","status":1,"optionSelect":[],"type":1,"optionList":[{"val":10,"id":22,"title":"否","questionId":6,"status":1,"orders":"","keyWord":""},{"val":0,"id":23,"title":"是","questionId":6,"status":1,"orders":"","keyWord":""},{"val":10,"id":24,"title":"不涉及","questionId":6,"status":1,"orders":"","keyWord":""}]},{"id":7,"short_title":"混合场所","files":[],"title":"生产、储存、经营场所是否与居住场所设置在同一建筑内","status":1,"optionSelect":[],"type":1,"optionList":[{"val":10,"id":25,"title":"否","questionId":7,"status":1,"orders":"","keyWord":""},{"val":0,"id":26,"title":"是","questionId":7,"status":1,"orders":"","keyWord":""},{"val":10,"id":27,"title":"不涉及","questionId":7,"status":1,"orders":"","keyWord":""}]}] ,
    curNav: 0,
    viewHeight: 300,
    toView: 0
  },
  onLoad: function () {
    // // 加载的使用进行网络访问，把需要的数据设置到data数据对象
     var that = this
    // wx.request({
    //   url: 'http://localhost:8080/xiaofang/small_question_list.action',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       navItems: res.data
    //     })
    //   }
    // })

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
  optionChange: function(e){
	  let index = e.target.dataset.index;
	  let val= e.detail.value;
	  
	  var up = "navItems[" + index + "].optionSelect";
		 this.setData({
			 [up]:val
		 });
	  
	  
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
         files= files.concat(res.tempFilePaths);
		
		 var up = "navItems[" + index + "].files";
		 that.setData({
			 [up]:files
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
			 [up]:files
		 });
  }


})