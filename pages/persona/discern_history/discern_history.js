// pages/persona/discern_history/discern_history.js
var getdate = require("../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyInfos: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      //url: app.globalData.localhost + '/api-basicS/issue/getHotIssue',
      url: app.globalData.localhost + '/api-basicS/searchHistory/picList',
      data: { signature: app.globalData.signature },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log(that)
        for(var i = 0;i < res.data.entity.length;i++){
          res.data.entity[i].createTime = res.data.entity[i].createTime.slice(0, 10)
        }
        that.setData({
          historyInfos: res.data.entity
        })
      },
      fail: function () {
        console.log("fail!!!!")
      }
    })
    that.setData({
      loadingHidden: true
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