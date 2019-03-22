//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    //用户个人信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //用户tap
    tag:[],
    //用户历史记录
    history:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    //获取用户数据
    var that = this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
        }
      })
    }


  },
  onShow:function(){
    var that = this
    if (app.globalData.getUserInfo==true){

      //请求用户标签
      wx.request({
        url: app.globalData.localhost +'/api-basicS/personal/tag',
        data: {
          signature: app.globalData.signature
        },
        method: "GET"
        ,
        success: function (res) {
          console.log(res)   //
          //小程序没授权登陆状态时
          if (res.data.stateInfo == "fail") {
            // util.reLogin(that, app)
            console.log(res.data.entity)
          } else {
            that.setData({
              tag: res.data.entity
            })
            console.log(res.data.entity)
          }
        }, fail: function () {
          // util.reLogin(this,app)
        }
      })
    }
  }
  ,
  getUserInfo: function (e) {
    //获取用户信息后重新登陆
    console.log("personal.js :reLogin")
    util.reLogin(this, app)
    //跳转到识别页面
    wx.switchTab({
      url: '/pages/index/index',
    })
    
  }
  ,navigateTag:function(){
    wx.navigateTo({
      url: '/pages/persona/add_tag/add_tag',
    })
  }
})
