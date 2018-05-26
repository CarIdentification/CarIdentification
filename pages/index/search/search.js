//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //input状态
    inputShowed: false,
    inputVal: "",
    //历史记录
    history: []
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    var that = this
    if (!app.globalData.userInfo) {
      util.getUserInfoScope(that, app)
    }
  }
  ,
  onLoad: function () {
    var that = this;
  },
  
  showInput: function () {
    var that = this;
    console.log("index_signature:            " + app.globalData.signature)
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/textSearchHistory',
      data: {

        signature: app.globalData.signature
      },
      success: function (e) {
        console.log(e)
        if (e.data.stateInfo != "fail") {
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

  //完成输出，开始搜索
  confirmInput: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/textSearch',
      data: {
        searchContext: e.detail.value,
        signature: app.globalData.signature
      },
      success: function (res) {
        console.log(res.data)
        //获取返回结果，进入新页面展示
        wx.navigateTo({
          url: '/pages/index/search/search',
        })
      }
    })
  }
})
