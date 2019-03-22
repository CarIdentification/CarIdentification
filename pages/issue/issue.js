// issue/issue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ["热门文章", "推荐文章"],
    currentTab: 0,
    wenben: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getHot(0)
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
  change: function (e) {
    console.log(app.globalData.signature)
    var idx = e.currentTarget.dataset.idx
    if(idx==0){
      this.getHot(idx)
    }else{
      this.getRecommend(idx)
    }
    // this.setData({
    //   currentTab: idx
    // });
  },
  looktext: function (e) {
    var id = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: './text/text?id=' + id,
    })
  },
  getHot:function(idx){
    var that = this
    wx.request({
      url: app.globalData.localhost + '/api-basicS/getHotIssue',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        that.setData({
          wenben: res.data,
          currentTab: idx
        })
      },
      fail: function () {
        console.log("失败")
      }
    })
  },
  getRecommend:function(idx){
    var that = this
    wx.request({
      url: app.globalData.localhost + '/api-basicS/getRecommendIssue',
      data: { signature: app.globalData.signature },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        that.setData({
          wenben: res.data,
          currentTab: idx
        })
      },
      fail: function () {
        console.log("失败")
      }
    })
  }
})