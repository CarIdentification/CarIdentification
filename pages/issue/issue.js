// issue/issue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: app.globalData.navData,
    text: ["热门文章", "推荐文章"],
    currentTab: 0,
    wenben: [],
    //input状态
    inputShowed: false,
    inputVal: "",
    //历史记录
    history:[],
    discernResult:[{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      'navData[1].current': 1
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
  },

  showInput: function () {
    var that = this;
    console.log("index_signature: " + app.globalData.signature)
    wx.request({
      url: app.globalData.localhost +'/api-basicS/search/textSearchHistory',
      data:{
        signature:app.globalData.signature
      },
      success:function(e){
        console.log(e)
        if(e.data.stateInfo!="fail"){
          that.setData({
            history: e.data.entity
          })
        }

      }
    })
    that.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputShowed: true,
      inputVal: e.detail.value
    });
  },
  //完成输出，开始搜索文章
  confirm: function(e){
    console.log(e.detail.value)
    wx.navigateTo({
      url: '/pages/index/search/search?msg=' + e.detail.value,
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