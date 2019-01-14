//先引用城市数据文件

var lineHeight = 0;
var endWords = "";
var isNum;
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: [
      { from: 0, to: 5, text: "5万以下" },
      { from: 5, to: 8, text: "5-8万" }, 
      { from: 8, to: 10, text: "8-10万" }, 
      { from: 10, to: 15, text: "10-15万" }, 
      { from: 15, to: 20, text: "15-20万" }, 
      { from: 20, to: 25, text: "20-25万" }, 
      { from: 25, to: 35, text: "25-35万" }, 
      { from: 35, to: 50, text: "35-50万" }],
    brand: [
      { brandName: "123", src: "/resource/image/brand_pic/1.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/2.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/3.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/4.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/5.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/6.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/7.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/8.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/9.jpg" },
      { brandName: "123", src: "/resource/image/brand_pic/10.jpg" },
    ],
    hidden: 0,
    // 是否已经拥有品牌
    hasBrand: false
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

    
    //在拥有权限的前提下，动态获取品牌信息
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/getBrands',
      data: { signature: app.globalData.signature },
      success: function (e) {
        // wx.setStorageSync("brand",e.entity)
        if (e.data.stateInfo == "success") {
          that.setData({
            brands: e.data.entity,
            hasBrand: true
          })
        }
      }
    })
    
    
    //设置字母导航条
    // var cityChild = city.City[0];
    wx.getSystemInfo({
      success: function (res) {
        lineHeight = (res.windowHeight - 100) / 22;
        console.log(res.windowHeight - 100)
        that.setData({
          // city: cityChild,
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
    var that = this
    if (!app.globalData.userInfo) {
      util.getUserInfoScope(that, app)
    }
    if (!that.data.hasBrand) {
      console.log(that.data.hasBrand + "*******************************************")
      //动态获取品牌信息
      wx.request({
        url: 'http://localhost:8762/api-basicS/search/getBrands',
        data: { signature: app.globalData.signature },
        success: function (e) {
          // wx.setStorageSync("brand",e.entity)
          if (e.data.entity.stateInfo == "success") {
            that.setData({
              brands: e.data.entity,
              hasBrand: true
            })
          }
        }
      })
    }
    
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
  //滑动条显示事件
  scroll:function(e){
    var that = this
    // console.log(e.detail.scrollTop)
    that.setData({
      hidden: e.detail.scrollTop
    })
  },
  // 查找子商标
  sonBrand:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/car/son_brand/son_brand?id='+e.currentTarget.id,
    })
  },
  priceSubmit:function(e){
    console.log(e)
    var param = {
      be_price: e.currentTarget.dataset.from,
      en_price: e.currentTarget.dataset.to,
    }
    app.globalData.advanced_mess = param
    wx.navigateTo({
      url: 'result_list/result_list',
    })
  }
})