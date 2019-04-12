// pages/car/advanced_search/advanced_search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: [{
        name: "小型车",
        value: '0',
        isCheck: false,
        src: '/resource/image/advanced_search_pic/small.png'
      },
      {
        name: "紧凑型车",
        value: '1',
        isCheck: false,
        src: '/resource/image/advanced_search_pic/compact.png'
      },
      {
        name: "中型车",
        value: '2',
        isCheck: false,         
        src: '/resource/image/advanced_search_pic/normal.png'
      },
      {
        name: "大型车",
        value: '3',
        isCheck: false,    
        src: '/resource/image/advanced_search_pic/big.png'
      },
      {
        name: "跑车",
        value: '4',
        isCheck: false,         
        src: '/resource/image/advanced_search_pic/sports.png'
      },
      {
        name: "轿跑车",
        value: '5',
        isCheck: false,         
        src: '/resource/image/advanced_search_pic/coupe.png'
      },
      {
        name: "SUV",
        value: '6',
        isCheck: false,         
        src: '/resource/image/advanced_search_pic/suv.png'
      },
      {
        name: "MPV",
        value: '7',
        isCheck: false,         
        src: '/resource/image/advanced_search_pic/mpv.png'
      },
      {
        name: "微面",
        value: '8',
        isCheck: false,
        src: '/resource/image/advanced_search_pic/van.png'
      },
      {
        name: "旅行车",
        value: '9',
        isCheck: false,
        src: '/resource/image/advanced_search_pic/wagon.png'
      }
    ],
    structure: [{
        name: "两厢",
        value: '0',
        isCheck: false
      },
      {
        name: "三厢",
        value: '1',
        isCheck: false
      },
      {
        name: "掀背",
        value: '2',
        isCheck: false
      },
      {
        name: "旅行版",
        value: '3',
        isCheck: false
      },
      {
        name: "硬顶敞篷车",
        value: '4',
        isCheck: false
      },
      {
        name: "软顶敞篷车",
        value: '5',
        isCheck: false
      },
      {
        name: "货车",
        value: '6',
        isCheck: false
      },
      {
        name: "客车",
        value: '7',
        isCheck: false
      },
    ],
    displacement: [{
        name: "1.0L及以下",
        value: '0',
        isCheck: false
      },
      {
        name: "1.1-1.6L",
        value: '1',
        isCheck: false
      },
      {
        name: "1.7-2.0L",
        value: '2',
        isCheck: false
      },
      {
        name: "2.1-2.5L",
        value: '3',
        isCheck: false
      },
      {
        name: "2.6-3.0L",
        value: '4',
        isCheck: false
      },
      {
        name: "2.1-4.0L",
        value: '5',
        isCheck: false
      },
      {
        name: "4.0L以上",
        value: '6',
        isCheck: false
      },
    ],
    Transmission: [{
        name: "手动",
        value: '0',
        isCheck: false
      },
      {
        name: "自动",
        value: '1',
        isCheck: false
      },
    ],
    country: [{
        name: "中国",
        value: '0',
        isCheck: false
      },
      {
        name: "德国",
        value: '1',
        isCheck: false
      },
      {
        name: "日本",
        value: '2',
        isCheck: false
      },
      {
        name: "美国",
        value: '3',
        isCheck: false
      },
      {
        name: "韩国",
        value: '4',
        isCheck: false
      },
      {
        name: "法国",
        value: '5',
        isCheck: false
      },
      {
        name: "英国",
        value: '6',
        isCheck: false
      },
      {
        name: "其他",
        value: '7',
        isCheck: false
      },
    ],
    production_methods: [{
        name: "国产",
        value: '0',
        isCheck: false
      },
      {
        name: "进口",
        value: '1',
        isCheck: false
      },
    ],
    seat: [{
        name: "2座",
        value: '0',
        isCheck: false
      },
      {
        name: "4座",
        value: '1',
        isCheck: false
      },
      {
        name: "5座",
        value: '2',
        isCheck: false
      },
      {
        name: "6座",
        value: '3',
        isCheck: false
      },
      {
        name: "7座",
        value: '4',
        isCheck: false
      },
      {
        name: "7以上",
        value: '5',
        isCheck: false
      },
    ],
    energy: [{
        name: "汽油",
        value: '0',
        isCheck: false
      },
      {
        name: "柴油",
        value: '1',
        isCheck: false
      },
      {
        name: "油电混合",
        value: '2',
        isCheck: false
      },
      {
        name: "纯电动",
        value: '3',
        isCheck: false
      },
    ],
    driving_method: [{
        name: "前驱",
        value: '0',
        isCheck: false
      },
      {
        name: "后驱",
        value: '1',
        isCheck: false
      },
      {
        name: "四驱",
        value: '2',
        isCheck: false
      },
    ],
    price: [0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit: function(e) {
    console.log(e)
    // var param = { titles: ['col1', 'col2', 'col3'],price:[1,2] }
    var that = this
    app.globalData.advanced_mess = e.detail.value

    wx.navigateTo({
      url: '../result_list/result_list',
    })

  },
  serviceValChange: function(e) {
    console.log(e)
    var that = this
    var id = e.currentTarget.id
    var array
    if (id == "level") {
      array = that.data.level;
    } else if (id == "structure") {
      array = that.data.structure;
    } else if (id == "displacement") {
      array = that.data.displacement
    } else if (id == "Transmission") {
      array = that.data.Transmission
    } else if (id == "country") {
      array = that.data.country
    } else if (id == "production_methods") {
      array = that.data.production_methods
    } else if (id == "seat") {
      array = that.data.seat
    } else if (id == "energy") {
      array = that.data.energy
    } else if (id == "driving_method") {
      array = that.data.driving_method
    }
    var checkArr = e.detail.value;
    for (var i = 0; i < array.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        array[i].isCheck = true;
      } else {
        array[i].isCheck = false;
      }
    }
    that.setData({
      [id]: array
    })
  }
})