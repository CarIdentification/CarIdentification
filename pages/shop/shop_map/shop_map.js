// pages/shop/shop_map/shop.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: app.globalData.navData,
    Height: 0,
    scale: 15,
    latitude: "",
    longitude: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      'navData[3].current': 1,
      latitude: options.latitude,
      longitude: options.longitude

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