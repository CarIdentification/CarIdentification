//app.js
const util = require('/utils/util.js');
App({
 
  onLaunch: function () {
    
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.getUserInfo = true
              this.globalData.signature = res.signature
              console.log(this.globalData.userInfo)
              console.log(this.globalData.signature)
              //向服务器发送登陆请求
              util.sendlogin(res.userInfo,res.signature,res.rawData)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("app.js-没有权限")
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    getUserInfo:false,
    signature:null,
    advanced_mess:null,
    localhost : "119.29.208.119:8762"
  }
})