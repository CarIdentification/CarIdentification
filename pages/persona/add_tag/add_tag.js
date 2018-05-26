// pages/persona/add_tag/add_tag.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    // 未选择的tag
    noHas:[],
    //用于标记（未选择的tag）按钮状态
    mark:[],
    add:[],
    // 新加的tag
    sendNoHas:[],
    //已选择的tag
    Has:[],
    //用于标记（已经选择的tag）按钮状态
    markHas: [],
    //删除的tag
    remove:[]
    


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.reflash()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

//选中未添加的标签
  addTag: function(e){
    var that = this
    // console.log(e.target.id)
    // console.log(that.data.mark)
    var mark = that.data.mark
    var add = that.data.add
    var f = 0
    for(var i in add){
      if ( e.target.id == add[i] ){
        add.splice(i,1)
        f = 1
      }
    }
    if( f == 0 ){
      add.push(e.target.id)
    }
    
    if (mark[e.target.id-1]==true){
      mark[e.target.id-1] = false
    }else{
      mark[e.target.id-1] = true
    }
    that.setData({
      add : add,
      mark : mark
    })
    console.log(that.data.mark)
    console.log(that.data.add)
  },

//选中已添加的标签
  removeTag: function (e) {
    var that = this
    // console.log(e.target.id)
    // console.log(that.data.markHas)

    var markHas = that.data.markHas
    var remove = that.data.remove
    var f = 0
    for (var i in remove) {
      if (e.target.id == remove[i]) {
        remove.splice(i, 1)
        f = 1
      }
    }
    if (f == 0) {
      remove.push(e.target.id)
    }

    if (markHas[e.target.id - 1] == true) {
      markHas[e.target.id - 1] = false
    } else {
      markHas[e.target.id - 1] = true
    }
    that.setData({
      remove : remove,
      markHas: markHas
    })
    console.log(that.data.markHas)
    console.log(that.data.remove)
  },

  //submit添加标签
  adding: function(){
    var that = this
    var add = that.data.add
    add.push(app.globalData.signature)
    // var send = JSON.stringify(mark)
    // console.log(send)
    wx.request({
      
      method:'POST',
      url: 'http://localhost:8762/api-basicS/personal/addTag',
      data:  add,
      success: function (res) {
        that.setData({
          add : []
        })
        add.pop()
        console.log(add)
        that.onShow()
      }
    })
    
  },

  //submit删除标签
  removing: function () {
    var that = this
    var remove = that.data.remove
    remove.push(app.globalData.signature)
    // var send = JSON.stringify(mark)
    // console.log(send)
    wx.request({

      method: 'POST',
      url: 'http://localhost:8762/api-basicS/personal/removeTag',
      data: remove,
      success: function (res) {
        that.setData({
          remove: []
        })
        remove.pop()
        console.log(remove)
        that.onShow()
      }
    })
    
  },

  reflash:function(){
    var that = this

    //请求未选择的标签
    wx.request({
      url: 'http://localhost:8762/api-basicS/personal/noTags',
      data: {
        signature: app.globalData.signature
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.entity[0])
        that.setData({
          noHas: res.data.entity[0],
          mark: res.data.entity[1]
        })
      }
    })

    //请求已使用的标签
    wx.request({
      url: 'http://localhost:8762/api-basicS/personal/tags',
      data: {
        signature: app.globalData.signature
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data.entity[0])
        that.setData({
          Has: res.data.entity[0],
          markHas: res.data.entity[1]
        })
      }
    })
  }
})