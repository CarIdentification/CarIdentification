// pages/persona/personal/edit_personal/edit_personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户个人信息
    userInfo : {} ,
    sexArr : ["未知","男", "女"]
  },

  // 修改性别
  editGender : function(e){
    let that = this
    let gender = 'userInfo.gender'
    that.setData({
      [gender]: e.detail.value
    })
    wx.request({
      // 编辑个人信息
      // url: app.globalData.localhost +'/api-basicS/personal/update',
      url: "http://localhost:8763/personal/update",
      data: {
        // user: that.data.userInfo,
        id: wx.getStorageSync('uid'),
        sex: that.data.userInfo.gender,
      },
      method: 'GET',
      success: function(res){
        console.log(res)
        app.globalData.userInfo.gender = that.data.userInfo.gender
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      userInfo: app.globalData.userInfo,
    })
    console.log(app)
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