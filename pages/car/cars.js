//先引用城市数据文件
var city = require('../../utils/test/test.js')
var lineHeight = 0;
var endWords = "";
var isNum;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: [{ from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }, { from: 0, to: 5, text: "5万以下" }],
    brand: [{ brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }, { brandName: "123", src: "/resource/image/car-pic/pic2.jpg" }],

    hidden: 0,
    cityName: "", //获取选中的城市名

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
    // 生命周期函数--监听页面初次渲染完成
    var cityChild = city.City[0];
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        lineHeight = (res.windowHeight - 100) / 22;
        console.log(res.windowHeight - 100)
        that.setData({
          city: cityChild,
          winHeight: res.windowHeight,
          lineHeight: lineHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  advancedSearch:function(e){
    wx.navigateTo({
      url: '/pages/car/advanced_search/advanced_search',
    })
  },

  // 商标列表
  //触发全部开始选择
  chStart: function () {
    this.setData({
      trans: "0.3",
      // hidden: false
    })
  },
  //触发结束选择
  chEnd: function () {
    this.setData({
      trans: "0",
      // hidden: true,
      scrollTopId: this.endWords
    })
  },
  //获取文字信息
  getWords: function (e) {
    var id = e.target.id;
    this.endWords = id;
    isNum = id;
    this.setData({
      showwords: this.endWords
    })
  },
  //设置文字信息
  setWords: function (e) {
    var id = e.target.id;
    this.setData({
      scrollTopId: id
    })
  },
  // 滑动选择城市
  chMove: function (e) {
    console.log(e)
    var y = e.touches[0].clientY;
    var offsettop = e.currentTarget.offsetTop;
    var height = 0;
    var that = this;
    ;
    var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    // 获取y轴最大值
    wx.getSystemInfo({
      success: function (res) {
        
        height = res.windowHeight - 10;
      }
    });
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop && y < height) {
      // console.log((y-offsettop)/lineHeight)
      var num = parseInt((y - offsettop) / lineHeight);
      endWords = cityarr[num];
      // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
      that.endWords = endWords;
    };
    //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
    //DOTO 这里暂时还有问题，还是比较卡，待优化
    if (isNum != num) {
      // console.log(isNum);
      isNum = num;
      that.setData({
        showwords: that.endWords,
        scrollTopId: that.endWords
      })
    }
  },
  //选择城市，并让选中的值显示在文本框里
  bindCity: function (e) {
    console.log(e);
    var cityName = e.currentTarget.dataset.city;
    this.setData({ cityName: cityName })
  },
  //滑动条显示事件
  scroll:function(e){
    var that = this
    console.log(e.detail.scrollTop)
    that.setData({
      hidden: e.detail.scrollTop
    })
    
  }
})