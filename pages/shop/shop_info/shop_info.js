// pages/shop/shop_info/shop_info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: app.globalData.navData,
    shop_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.localhost + '/api-basicS/search/getShopInfo',
      // url: 'http://localhost:8763/search/getShopInfo',
      data: { id:options.id },
      success: function (e) {
        if(e.data.entity.shopPic==null){
          e.data.entity.shopPic = '/resource/image/sell-shop/sell_shop_1.jpg'
        }
        that.setData({
          shop_info:e.data.entity,
          salesmans: e.data.entity.salesMan
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
      phoneNumber: that.data.shop_info.tel
    })
  },
  callSalesmanPhone(e){
    var that = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel.replace('转',',')
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
  shopMap: function(){
    var that = this
    wx.navigateTo({
      url: '../shop_map/shop_map?latitute=' + that.data.shop_info.latitute + "&longitude=" + that.data.shop_info.longitude + "&locationDetail=" + that.data.shop_info.locationDetail + "&shopName=" + that.data.shop_info.shopName,
    })
  }
})