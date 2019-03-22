var getdate = require("../../../utils/util.js")
var WxParse = require('../../../wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    wenben: [],
    date:'',
    pic:'',
    articleContent:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id;
    wx.request({
      url: app.globalData.localhost +'/api-basicS/getIssue?id=' + id,
      method: 'GET',
      success: function (res) {
        var date = res.data.createTime.slice(0,10)
        var pic =  "../"+ res.data.topicPic
        WxParse.wxParse('articleContent', 'html', res.data.content, that, 5);
        that.setData({
          wenben: res.data,
          date:date,
          pic: pic
        })
      },
      fail: function () {
        console.log("失败")
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

  }
})