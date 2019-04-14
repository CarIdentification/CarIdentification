// 引用百度地图微信小程序JSAPI模块 
// var bmap = require('../../libs/bmap-wx.min.js'); 
const util = require('../../utils/util.js'); 
const app = getApp();
Page({
  data: {
    navData: app.globalData.navData,
    Height: 0,
    scale: 15,
    latitude: "",
    longitude: "",
    markers:[]
  },

  onLoad: function () {
    var that = this;
    that.setData({
      'navData[3].current': 1
    })
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

    wx.getLocation({
      type: 'wgs84',
      success(ress) {

        wx.request({
          url: app.globalData.localhost + '/api-basicS/search/getAroundShop',
          data: {
            latitude : ress.latitude,
            longitude: ress.longitude
          },
          success:function(res){
          
            var length = res.data.entity.length;
            var mar = [];
            for (var i = 0; i < length ; i++){
              // for (var i = 0; i < 1; i++) {
              mar[i] = {
                iconPath: '../../resource/image/location_4.png',
                id: res.data.entity[i].id,
                latitude: res.data.entity[i].latitute,
                longitude: res.data.entity[i].longitude,
                // id: 5,
                // latitude: ress.latitude,
                // longitude: ress.longitude,
                width: 30,
                height: 30,
                callout: {
                  content: res.data.entity[i].locationDetail,
                  // content: "aaa",
                  padding: 5
                },
                label: {
                  content: res.data.entity[i].shopName
                  // content: "bbb"
                }
              }
            }
            that.setData({
              markers : mar,
              latitude : ress.latitude,
              longitude : ress.longitude
            })
          }

        })
      }
    })

    
    // 新建百度地图对象 
    // var BMap = new bmap.BMapWX({
    //   ak: '6uQBsdD4q2Qa1VBr37pXhLfxcoGg7B43'
    // });
    // 发起POI检索请求 
    // BMap.search({
    //   "query": '汽车销售',
    //   "radius": 2000,
    //   success: function (res){
    //     that.setData({
    //       markers: res.wxMarkerData,
    //       latitude: res.wxMarkerData[0].latitude,
    //       longitude: res.wxMarkerData[0].longitude,
    //     })
    //   },
    //   // 此处需要在相应路径放置图片文件 
    //   iconPath: '../../resource/image/location_4.png',
    //   // 此处需要在相应路径放置图片文件 
    //   iconTapPath: '../../resource/image/shop_location.png',
    //   width: 30,
    //   height: 30,
    // }); 
  },


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
      url: 'shop_info/shop_info?id=' + e.markerId +'&fromPage=1',
    })
  },
  gotoCars: function () {
    wx.switchTab({
      url: '/pages/car/cars'
    });
  },
  gotoIndex: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  gotoIssue: function () {
    wx.switchTab({
      url: '/pages/issue/issue',
    });
  },
  gotoShop: function () {
    wx.switchTab({
      url: '/pages/shop/shop',
    });
  },
  gotoMy: function () {
    wx.switchTab({
      url: '/pages/persona/personal',
    });
  },

})