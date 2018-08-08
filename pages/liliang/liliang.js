var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["微型消防站", "现役和政府消防队", "消防水源"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scale1:16,
    scale2: 16,
    scale3: 16,	
	positons:[],
  markers1: [],
  markers2: [],
  markers3: []
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
      success: function (res) {
       
        for(var index in res.data){
			var pos=res.data[index];
			var type=pos.type;
			console.log(type);
			if(type==1){
				var callout={};
				var marker={};
				callout['content']=pos.name+'\n'+pos.phone+'\n'+pos.remark;
				callout['display']='ALWAYS';
				callout['padding']=10;
				callout['borderRadius']=10;
				callout['bgColor']='#eeeeee';
				marker['id']=pos.id;
				marker['callout']=callout;
				marker['latitude']=pos.latitude;
				marker['longitude']=pos.longitude;
				markers1.push(marker);
			}else if(type==2){
				var callout={};
				var marker={};
				callout['content']=pos.name+'\n'+pos.phone+'\n'+pos.remark;
				callout['display']='ALWAYS';
				callout['padding']=10;
				callout['borderRadius']=10;
				callout['bgColor']='#eeeeee';
				marker['id']=pos.id;
				marker['callout']=callout;
				marker['latitude']=pos.latitude;
				marker['longitude']=pos.longitude;
				markers2.push(marker);
			}else if(type==3 || type==4){
				var callout={};
				var marker={};
				callout['content']=pos.name+'\n'+pos.remark;
				callout['display']='ALWAYS';
				callout['padding']=10;
				callout['borderRadius']=10;
				callout['bgColor']='#eeeeee';
				marker['id']=pos.id;
				marker['callout']=callout;
				marker['latitude']=pos.latitude;
				marker['longitude']=pos.longitude;
				markers3.push(marker);
			}	
		}
		
		that.setData({
			positons:res.data,
			markers1:markers1,
			markers2:markers2,
			markers3:markers3,
			scale1:14,
			scale2: 14,
			scale3: 14
		});
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id

    });
  },
  markertap(e) {
    console.log(e.markerId)
  },
  click: function (e) {
    console.log(e);
	var markerId= e.markerId;
	var latitude,longitude,name,address;
	for(var index in this.data.positons){
		var pos=this.data.positons[index];
		if(markerId == pos.id){
			latitude= pos.latitude;
			longitude=pos.longitude;
			name=pos.name;
			address=pos.position;
			break;
		}
	} 
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      scale: 18,
      name: name,
      address: address
    })
  }
});