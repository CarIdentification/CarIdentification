// pages/index/discern/discern.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    widthSize: 0.9,
    animationData: {},
    property: util.property,
    iconImg:"/resource/image/discern.png",
    indicatorDots: false,
    autoplay: false,
    current: 0,
    circular: false,
    discernResult:[{},{}]
  },
  scroll_:function(e){
    var that = this;
    if (e.detail.scrollTop < 120){
      that.setData({
        widthSize: 1 - (120-e.detail.scrollTop)*0.00083333
      })
    }else{
      that.setData({
        widthSize: 1
      })
    }
    console.log(e.detail.scrollTop)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('discernResult'))
    var that = this
    
    that.setData({
      discernResult: wx.getStorageSync('discernResult').entity
    })
  
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          winHeight: res.windowHeight,
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

  }
})