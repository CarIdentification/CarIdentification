//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //input状态
    inputShowed: false,
    inputVal: "",
    //历史记录
    history:[]
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    const ctx = wx.createCanvasContext('myCanvas')
    // Draw coordinates
    ctx.arc(80, 80, 80, 0, 2 * Math.PI)
    ctx.setFillStyle('#C5D4FA')
    ctx.fill()

    //识别相机logo
    ctx.drawImage("/resource/image/discern.png", 55,55, 55,55)
    
    ctx.draw()
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getCarPhoto: function(e){
    wx.chooseImage({
      count:3,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.request({
          url: '',
          data:{},
          success: function (res) {
            console.log(res.data)

          }
        })
      },
    })
  },
  showInput: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/textSearchHistory',
      data:{
        userId:1
      },
      success:function(e){
        console.log(e)
        that.setData({
          history:e.data.entity
        })
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
  confirmInput: function(e){
    console.log(e.detail.value)
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/textSearch',
      data:{
        searchContext: e.detail.value
      },
      success: function (res) {
        console.log(res.data)
        //获取返回结果，进入新页面展示
        // wx.navigateTo()
      }
    })
  }
})
