// pages/persona/own_car/own_car.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: app.globalData.navData,
    ownCarInfos: [],
    loadingHidden: true
  },
  delOwnCar: function(e) {
    let that = this
    console.log(wx.getStorageSync('uid'))
    wx.showModal({
      title: '提示',
      content: '确定要移除该车型吗？',
      success: function(sm) {
        if (sm.confirm) {
          wx.request({
            url: app.globalData.localhost + '/api-basicS/personal/delOwnCar',
            // url: "http://127.0.0.1:8763/personal/delOwnCar",
            method: 'POST',
            header: {
              "Accept": "application/json, text/javascript, */*; q=0.01",
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: {
              carId: e.currentTarget.dataset.carid,
              userId: wx.getStorageSync('uid')
            },
            success: function(res) {
              console.log(res)
              // 更新成功则刷新页面
              that.onLoad()
            }
          })
        }else if (sm.cancel){
          console.log('用于取消点击')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      loadingHidden: false,
      'navData[4].current': 1
    })
    wx.request({
      url: app.globalData.localhost + '/api-basicS/personal/getOwnCar?userId=' + wx.getStorageSync('uid'),
      // url: 'http://127.0.0.1:8763/personal/getOwnCar?userId=' + wx.getStorageSync('uid'),
      method: 'GET',
      success: function(res) {
        console.log(res)
        console.log(that)
        that.setData({
          ownCarInfos: res.data.entity
        })
      },
      fail: function() {
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