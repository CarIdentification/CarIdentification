// pages/car/result_car/result_car.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: app.globalData.navData,
    property:util.property,
    result:{},
    pics:[],
    salesmans:[],
    latitude:"",
    longitude:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    that.setData({
      'navData[0].current': 1
    })
    var id = options.id
    wx.getLocation({
      type: 'wgs84',
      success: function(ress) {
      
        wx.request({
          url: app.globalData.localhost + '/api-basicS/search/getCar',
          data: {
            id: id,
            latitude: ress.latitude,
            longitude: ress.longitude
          },
          success: function (res) {
            var pics = new Array()
            for (var i = 0; i < res.data.entity.carPic.length; i++) {
              pics[i] = "http:" + res.data.entity.carPic[i].imgSrc
            }
            console.log(pics)
            if (res.data.entity.carPic.length > 6) {
              for (var i = 6; i < res.data.entity.carPic.length; i++) {
                res.data.entity.carPic[i] = null
              }
            }
            res.data.entity.carPic.length = 6;
            that.setData({
              result: res.data.entity,
              pics: pics
            })
            // wx.request({
            //   url: app.globalData.localhost +'/api-basicS/search/getSalesman',
            //   data:{brandId:res.data.entity.carBrand},
            //   success:function(e){
            //     that.setData({
            //       salesmans:e.data.entity
            //     })
            //   }
            // })


          }
        })
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  showPic:function(e){
    // console.log(e)
    var that = this
    wx.previewImage({
      current: "http:" + e.currentTarget.dataset.src,// 当前显示图片的http链接
      urls: that.data.pics // 需要预览的图片http链接列表
    })
  },
  navigateToSellShop:function(e){
    var id = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '../../shop/shop_info/shop_info?id=' + id+'&from=0' ,
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