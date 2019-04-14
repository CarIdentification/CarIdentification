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
    longitude:"",
    current_info_tab: 1,
    currentHasAdd:false,
    width:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    that.setData({
      'navData[0].current': 1
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
        })
      },
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
            res.data.entity.carPic = res.data.entity.carPic.slice(0,9)
            for (var i = 0; i < res.data.entity.carPic.length; i++) {
              pics[i] = "http:" + res.data.entity.carPic[i].imgSrc
            }
            
            that.setData({
              result: res.data.entity,
              pics: pics
            })
            that.checkCurrentInOwn();
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
      url: '../../shop/shop_info/shop_info?id=' + id +'&fromPage=0' ,
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
  switchTab: function (e) {
    var that = this;
    that.setData({
      current_info_tab: e.currentTarget.dataset.tabid
    })
  },
   checkCurrentInOwn() {
    const that = this;
    wx.request({
      url: app.globalData.localhost + '/api-basicS/personal/haveCar',
      data: {
        userId: wx.getStorageSync("uid"),
        carId: that.data.result.id
      },
      success: function (res) {
        if (res.data.entity == 0) {
          that.setData({
            currentHasAdd: false
          })
        } else {
          that.setData({
            currentHasAdd: true
          })
        }
      }
    })
  },
  addHasCar() {
    const that = this;
    wx.request({
      method: 'POST',
      header: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      url: app.globalData.localhost + '/api-basicS/personal/addOwnCar',
      data: {
        userId: wx.getStorageSync("uid"),
        carId: that.data.result.id
      },
      success: function (res) {
        if (res.data.entity == 1) {
          that.setData({
            currentHasAdd: true
          })
          wx.showToast({
            icon: 'none',
            title: '加入车库成功'
          })
        } else {
          that.setData({
            currentHasAdd: false
          })
          wx.showToast({
            title: '加入车库失败'
          })
        }
      }
    })
  },
  delHasCar() {
    const that = this;
    wx.request({
      method: 'POST',
      header: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      url: app.globalData.localhost + '/api-basicS/personal/delOwnCar',
      data: {
        userId: wx.getStorageSync("uid"),
        carId: that.data.result.id
      },
      success: function (res) {
        if (res.data.entity == 1) {
          that.setData({
            currentHasAdd: false
          })
          wx.showToast({
            title: '从车库移除成功'
          })
        } else {
          that.setData({
            currentHasAdd: true
          })
          wx.showToast({
            icon: 'none',
            title: '移出车库失败'
          })
        }
      }
    })
  }
})