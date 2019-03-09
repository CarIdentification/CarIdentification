//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //input状态
    inputShowed: false,
    inputVal: "",
    //历史记录
    history: [],
    issues:[],
    cars:[]
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
  onLoad: function (option) {
    var that = this;
    var msg = option.msg;
    that.setData({
      inputVal:msg
    })
    that.search(option.msg)
  },
  showInput: function () {
    var that = this;
    console.log("index_signature:            " + app.globalData.signature)
    wx.request({
      url: 'http://' + app.globalData.localhost +'/api-basicS/search/textSearchHistory',
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
    var that = this
    that.search(e.detail.value)
  },
  search(value){
    var that = this
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: 'http://' + app.globalData.localhost +'/api-basicS/search/textSearch',
      data: {
        searchContext: value,
        signature: app.globalData.signature
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          issues: res.data.entity.issue,
          cars: res.data.entity.carList
        })
        WxParse.wxParse('issues[0].content', 'html', that.data.issues[0].content, that, 5);
        wx.hideLoading()
      }
    })
    
  },
  getCarInfo(e){
    console.log(e)
    wx.navigateTo({
      url: '../../car/result_car/result_car?id=' + e.currentTarget.id,
    })
  }
})
