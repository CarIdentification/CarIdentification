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
              that.globalData.userInfo = res.userInfo
              that.globalData.getUserInfo = true
              console.log(this.globalData.userInfo)
              //向服务器发送登陆请求
              util.sendlogin(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("app.js-没有权限")
          // wx.getUserInfo({
          //   success:function(e){
          //     console.log(e.userInfo)
          //   },
          //   fail: function () {
          //     that.globalData.getUserInfo = false
          //     wx.showModal({
          //       title: '您的操作需要授权',
          //       content: '是否授权用户信息',
          //       cancelText: '否',
               
          //       confirmText: '是',
          //       success: function () {
          //         wx.openSetting({
          //           // util.getUserInfoScope(that,)
          //         })
          //       },
          //       fail: function () {
                  
          //       }
          //     })
          //     console.log("没有权限")
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    getUserInfo:false
  }
})