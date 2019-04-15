// pages/car/result_list/result_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: app.globalData.navData,
    cars: [],
    // mark: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // var mark = options.mark
    that.setData({
      'navData[0].current': 1
    })
    wx.request({
      method: 'POST',
      dataType: "json",
      url: app.globalData.localhost + '/api-basicS/search/advancedSearch',
      data: app.globalData.advanced_mess,
      header: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: function(res) {
        that.setData({
          cars: res.data.entity,
          // mark: mark
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  showCarMess: function(e) {
    wx.navigateTo({
      url: '../result_car/result_car?id=' + e.currentTarget.id+'&fromPage=0',
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
  getCarInfo(e) {
    console.log(e)
    wx.navigateTo({
      url: '../result_car/result_car?id=' + e.currentTarget.id + '&fromPage=0',
    })
  },
})