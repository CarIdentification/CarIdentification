// pages/index/discern/discern.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    widthSize: 0.9,
    animationData: {},
    picsAnimationData:{},
    saleAnimationData:{},
    property: util.property,
    iconImg:"/resource/image/discern.png",
    indicatorDots: false,
    autoplay: false,
    current: 0,
    circular: false,
    discernResult:[{},{}],
    expand:false,
    reduce:true
  },
  scroll_:function(e){
    var that = this;
    if (e.detail.scrollTop > 60 && that.data.expand==false){
      // 放大
        this.animation.width(that.data.width + 30).step()
        this.picAnimation.width('30vw').step()
        this.saleAnimation.width('750rpx').step()
        console.log("放大")
        that.setData({
          expand:true,
          reduce:false,
          animationData: this.animation.export(),
          picsAnimationData: this.picAnimation.export(),
          saleAnimationData: this.saleAnimation.export()
        })
    } else if (e.detail.scrollTop < 150 && that.data.reduce==false){

        this.animation.width(that.data.width - 30).step()
        this.picAnimation.width('27vw').step()
      this.saleAnimation.width('690rpx').step()
      that.setData({
        reduce: true,
        expand:false,
        animationData: this.animation.export(),
        picsAnimationData: this.picAnimation.export(),
        saleAnimationData: this.saleAnimation.export()
      })
        console.log("缩小")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("*****************************:  "+wx.getStorageSync('discernResult'))
    var result = wx.getStorageSync('discernResult')
    //车辆信息
    var that = this
    //动画
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })

    const picAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })

    const saleAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation
    this.picAnimation = picAnimation
    this.saleAnimation = saleAnimation

    that.setData({
      animationData: animation.export(),
      picsAnimationData: picAnimation.export(),
      saleAnimationData: saleAnimation.export()
    })
    //显示加载框
    wx.showLoading({
      title: '识别中，请稍等',
      mask: true,
    })
    //异步请求识别数据
    wx.request({
      url: app.globalData.localhost + '/api-basicS/search/getCar',
      data: { ids: result },
      success: function (res) {
        that.setData({discernResult : res.data.entity})
      },
      complete: function(){
        wx.hideLoading()
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          width: res.windowWidth,
          winHeight: res.windowHeight,
        })
      },
    })
  },
  uploadImg: function (i, tempFilePaths, size, last) {
    var that = this;
    if (i == size - 1) {
      last = 1;
    }
    wx.uploadFile({
      url: app.globalData.localhost + '/classify-service/classify/car',
      filePath: tempFilePaths[i],
      name: 'carImg',
      formData: {
        userId: wx.getStorageSync('uid')
      },
      success(res) {
        console.log("发送第"+i+"张照片成功!");
        if (last == 0) {
          that.uploadImg(++i, tempFilePaths, size, last);
        } else {
        
          wx.setStorageSync('discernResult', JSON.parse(res.data.data))
          console.log(wx.getStorageSync('discernResult'))
          that.setData({
            discernResult: wx.getStorageSync('discernResult').entity
          })
        }
      }
    })
  },
  getCarPhoto: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        var size = tempFilePaths.length
        console.log(tempFilePaths)
        var last = 0;
        that.uploadImg(0, tempFilePaths, size, last);
      }
    })
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

  }
  ,
  getCarResult(index,id){
    var that = this
    var param = {};
    var discernResult_pics_string = "discernResult["+index+"].pics";
    var discernResult_entity_string = "discernResult[" + index + "].carEntity";
    var discernResult_salesmans_string = "discernResult[" + index + "].salesmans";
    wx.request({
      url: 'http://' + app.globalData.localhost + '/api-basicS/search/getCar',
      data: { id: id },
      success: function (res) {
        var pics = new Array()
        for (var i = 0; i < res.data.entity.carPic.length; i++) {
          pics[i] = "../../../resource/image/car-pic/" + res.data.entity.carPic[i].imgSrc
        }
        console.log(pics)
        param[discernResult_pics_string] = pics;
        param[discernResult_entity_string] = res.data.entity;
        wx.request({
          url: 'http://' + app.globalData.localhost + '/api-basicS/search/getSalesman',
          data: { brandId: res.data.entity.carBrand },
          success: function (e) {
            param[discernResult_salesmans_string] = res.data.entity;
          }
        })
      }
    })
    that.setData(param)
  }
})
