//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');

Page({
  data: {
    navData: app.globalData.navData,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //input状态
    inputShowed: false,
    inputVal: "",
    //历史记录
    history:[],
    discernResult:[{}]
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    const ctx = wx.createCanvasContext('myCanvas')
    // Draw coordinates
    ctx.arc(80, 80, 80, 0, 2 * Math.PI)
    ctx.setFillStyle('rgba(197, 212, 250, 0.5)')
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
  onShow:function(){
    var that = this
    if (!app.globalData.userInfo){
      util.getUserInfoScope(that, app)
    }
  }
  ,
  onLoad: function () {
    var that = this;
    that.setData({
      'navData[2].current' :1
    })
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        
      })
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        
        that.setData({
          userInfo: res.userInfo,
        })
      }
      console.log("indexA.js-没有权限")
      util.getUserInfoScope(that, app)
    } else {
      console.log("indexB.js-没有权限")
      util.getUserInfoScope(that, app)
    }
  },
  getUserInfo: function(e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
    })
  },
  uploadImg: function (i, tempFilePaths,size,last){
    var that = this;
    if (i == size - 1) {
      last = 1;
    }
    wx.showLoading({
      title: '识别中，请稍候',
    })
    wx.uploadFile({
      url: app.globalData.localhost +'/classify-service/classify/car',
      filePath: tempFilePaths[i],
      name: 'carImg',
      formData: {
        userId: wx.getStorageSync('uid')
      },
      success(res) {
        console.log("发送第" + i + "张照片成功!");
        if(last==0){
          that.uploadImg(++i,tempFilePaths,size,last);
        }else{
          wx.setStorageSync('discernResult', JSON.parse(res.data).data)
          console.log(wx.getStorageSync('discernResult'))
          wx.navigateTo({
            url: 'discern/discern',
          })
        }
      }
    })
  },
  getCarPhoto: function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        var size = tempFilePaths.length
        console.log(tempFilePaths)
        var last = 0;
        that.uploadImg(0, tempFilePaths,size,last);
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
            history: e.data.entity,
            inputShowed: true
          })
        }
        
      }
    })
    // that.setData({
    //   inputShowed: true
    // });
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
    // wx.request({
    //   url: app.globalData.localhost +'/api-basicS/search/textSearch',
    //   data:{
    //     searchContext: e.detail.value,
    //     signature: app.globalData.signature
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     //获取返回结果，进入新页面展示
    //     wx.navigateTo({
    //       url: '/pages/index/search/search',
    //     })
    //   }
    // })
    wx.navigateTo({
      url: '/pages/index/search/search?msg=' + e.detail.value+'&fromPage=1',
    })
  },
  gotoCars: function () {
    wx.switchTab({
      url: '/pages/car/cars'
    });
  },
  gotoIndex: function(){
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
  removeTextSearchHistory:function(){
    var that= this
    wx.request({
      url: app.globalData.localhost + '/api-basicS/search/removeTextSearchHistory',
      // url: 'http://localhost:8763' + '/search/removeTextSearchHistory',
      data:{
        signature: app.globalData.signature
      },
      success:function(res){
        that.setData({
          history:[]
        })
      }
    })
  }
})
