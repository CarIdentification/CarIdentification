// pages/shop/shop_info/shop_info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      shop_info:{
        latitude: options.latitude,
        longitude: options.longitude,
        title: options.title,
        address: options.address,
        telephone: options.telephone
      }
    })
    wx.request({
      url: 'http://' + app.globalData.localhost + '/api-basicS/search/getSalesman',
      data: { brandId: 9 },
      success: function (e) {
        that.setData({
          salesmans: e.data.entity
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
  callPhone(e){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.shop_info.telephone
    })
  }
})