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

const sendlogin = userInfo => {
  // 登录
  wx.login({
    success: res => {
      console.log(2222)
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'http://localhost:8762/api-basicS/personal/sendUserCode',
          data: {
            code: res.code,
            // nickname: userInfo.nickName,
            headimg: userInfo.avatarUrl,
            sex: userInfo.gender
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
  sendlogin:sendlogin
}
