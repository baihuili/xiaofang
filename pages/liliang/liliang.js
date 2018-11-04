var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["微型消防站", "现役和政府消防队", "消防水源"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
	positons:[],
  markers1: [],
  markers2: [],
  markers3: [],
  scale:12,
  markers:[]
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
      var resourceStatus = pos.resourceStatus;
			if(type==1){
				var callout={};
				var marker={};
        
        callout['content'] = pos.name + '\n负责人：'+pos.head+'\n电话：' +pos.phone;
				callout['display']='ALWAYS';
				callout['padding']=10;
				callout['borderRadius']=10;
				callout['bgColor']='#eeeeee';
				marker['id']=pos.id;
				marker['callout']=callout;
				marker['latitude']=pos.latitude;
				marker['longitude']=pos.longitude;
        if(resourceStatus==2){
          marker['iconPath'] = '/images/yellow.png';
        } else if (resourceStatus == 3) {
          marker['iconPath'] = '/images/red.png';
        }else{
          marker['iconPath'] = '/images/blue.png';
        }
				markers1.push(marker);
			}else if(type==2){
				var callout={};
				var marker={};
        callout['content'] = pos.name + '\n负责人：' + pos.head + '\n电话：' + pos.phone;
				callout['display']='ALWAYS';
				callout['padding']=10;
				callout['borderRadius']=10;
				callout['bgColor']='#eeeeee';
				marker['id']=pos.id;
				marker['callout']=callout;
				marker['latitude']=pos.latitude;
				marker['longitude']=pos.longitude;
        if (resourceStatus == 2) {
          marker['iconPath'] = '/images/yellow.png';
        } else if (resourceStatus == 3) {
          marker['iconPath'] = '/images/red.png';
        } else {
          marker['iconPath'] = '/images/blue.png';
        }
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
        if (resourceStatus == 2) {
          marker['iconPath'] = '/images/yellow.png';
        } else if (resourceStatus == 3) {
          marker['iconPath'] = '/images/red.png';
        } else {
          marker['iconPath'] = '/images/blue.png';
        }
				markers3.push(marker);
			}	
		}
		
		that.setData({
			positons:res.data,
      markers: markers1,
			markers1:markers1,
			markers2:markers2,
			markers3:markers3,
      scale: 12
		});
      }
    })
  },
  tabClick: function (e) {
    console.log(e.currentTarget.id);
    var that=this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft
      

    });

    if (e.currentTarget.id==0){
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