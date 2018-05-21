const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取个人信息并在后台登陆
const reLogin = (that,app) =>{
  wx.getUserInfo({
    success: res => {
      app.globalData.userInfo = res.userInfo
      app.globalData.getUserInfo = true
      app.globalData.signature = res.signature
      that.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
      sendlogin(res.userInfo,res.signature,res.rawData)
    }
  })
}
//让用户设置个人信息权限（强盗系统）
const getUserInfoScope = (that, app) =>{

  wx.getUserInfo({
    success: function (res) {
      console.log("util.js-拥有权限")
      
    },
    fail: function () {
      console.log("util.js-没有权限")
      app.globalData.getUserInfo = false
      wx.showModal({
        title: '您的操作需要授权',
        content: '是否授权用户信息',
        cancelText: '否',

        confirmText: '是',
        //用户点击授权
        success: function (e) {
          //点击确认按钮
          if(e.confirm==true){
            //打开授权页面
            wx.openSetting({

              success: function (e) {
                //如果用户授权了个人信息权限，将个人信息记录在that与app的data中，并从后台登陆
                if (e.authSetting['scope.userInfo'])
                  reLogin(that, app)
                else
                  //强盗
                  // getUserInfoScope(that, app)
                  wx.switchTab({
                    url: "/pages/persona/personal"
                  })
              }
            })
          }else{
            //点击取消按钮
            wx.switchTab({
              url: "/pages/persona/personal"
            })
            //强盗
          // getUserInfoScope(that,app)
          }
        }
      })
    }
  })
}
const sendlogin = (userInfo, signature, rawData) => {
  // 登录
  wx.login({
    success: res => {
      console.log("服务端登陆请求：")
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'http://localhost:8762/api-basicS/personal/sendUserCode',
          data: {
            code: res.code,
            nickname: userInfo.nickName,
            headimg: userInfo.avatarUrl,
            sex: userInfo.gender,
            signature: signature,
            rawData: rawData
          },
          success: function (res) {
            console.log(res.data)

          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  sendlogin:sendlogin,
  reLogin: reLogin,
  getUserInfoScope: getUserInfoScope
}
