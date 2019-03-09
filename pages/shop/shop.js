// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min.js'); 
Page({
  data: {
    Height: 0,
    scale: 15,
    latitude: "",
    longitude: "",
    markers:[]
  },

  onLoad: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })

    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '6uQBsdD4q2Qa1VBr37pXhLfxcoGg7B43'
    });
    // 发起POI检索请求 
    BMap.search({
      "query": '汽车销售',
      "radius": 2000,
      success: function (res){
        that.setData({
          markers: res.wxMarkerData,
          latitude: res.wxMarkerData[0].latitude,
          longitude: res.wxMarkerData[0].longitude,
        })
      },
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../resource/image/location_4.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../resource/image/shop_location.png',
      width: 30,
      height: 30,
    }); 
  },

  // regionchange(e) {
  //   console.log("regionchange===" + e.type)
  // },

  //点击merkers
  markertap(e) {
    
  },


  // //点击缩放按钮动态请求数据
  // controltap(e) {
  //   var that = this;
  //   console.log("scale===" + this.data.scale)
  //   if (e.controlId === 1) {
  //     // if (this.data.scale === 13) {
  //     that.setData({
  //       scale: --this.data.scale
  //     })
  //     // }
  //   } else {
  //     //  if (this.data.scale !== 13) {
  //     that.setData({
  //       scale: ++this.data.scale
  //     })
  //     // }
  //   }


  // },
  callouttap(e){
    var that = this
    //进入详情页
    console.log(e)
    var marker = that.data.markers[e.markerId];
    wx.navigateTo({
      url: 'shop_info/shop_info?latitude=' + marker.latitude + '&longitude='+marker.longitude+'&title='+marker.title+'&address='+marker.address+'&telephone='+marker.telephone,
    })
  }

})