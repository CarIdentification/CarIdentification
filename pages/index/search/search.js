//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js')

Page({
  data: {
    navData: app.globalData.navData,
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
  onLoad: function (options) {
    var that = this;
    var msg = options.msg;
    if(options.fromPage=="1"){
      that.setData({
        inputVal: msg,
        'navData[2].current': 1
      })
    }else{
      that.setData({
        inputVal: msg,
        'navData[0].current': 1
      })
    }
    
    that.search(options.msg)
    wx.request({
      url: app.globalData.localhost + '/api-basicS/search/textSearchHistory',
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
  },
  showInput: function () {
    var that = this;
    console.log("index_signature:            " + app.globalData.signature)
    wx.request({
      url: app.globalData.localhost +'/api-basicS/search/textSearchHistory',
      data: {

        signature: app.globalData.signature
      },
      success: function (e) {
        console.log(e)
        if (e.data.stateInfo != "fail") {
          that.setData({
            history: e.data.entity,
            inputShowed: true
          })
        }

      }
    })

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
      url: app.globalData.localhost +'/api-basicS/search/textSearch',
      // url: 'http://localhost:8763' + '/search/textSearch',
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
        
      },
      complete:function(){
        wx.hideLoading()
      }
    })
    
  },
  getCarInfo(e){
    console.log(e)
    wx.navigateTo({
      url: '../../car/result_car/result_car?id=' + e.currentTarget.id+'&fromPage=2',
    })
  },
  removeTextSearchHistory: function () {
    var that = this
    wx.request({
      url: app.globalData.localhost + '/api-basicS/search/removeTextSearchHistory',
      // url: 'http://localhost:8763' + '/search/removeTextSearchHistory',
      data: {
        signature: app.globalData.signature
      },
      success: function (res) {
        that.setData({
          history: []
        })
      }
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
