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
    cardHeight: 910,
    animationData: {},
    picsAnimationData: {},
    saleAnimationData: {},
    property: util.property,
    iconImg: "/resource/image/discern.png",
    indicatorDots: false,
    autoplay: false,
    current: 0,
    current_car: 0,
    current_info_tab: 1,
    circular: false,
    discernResult: [{}, {}],
    expand: false,
    reduce: true,
    latitude: "",
    longitude: ""
  },
  scroll_: function(e) {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth,
          width: res.windowWidth,
          winHeight: res.windowHeight,
        })
      },
    })
    //车辆信息
    that.displayResult()
  },
  uploadImg: function(i, tempFilePaths, size, last) {
    //显示加载框
    wx.showLoading({
      title: '识别中，请稍等',
      mask: true,
    })
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
        console.log("发送第" + i + "张照片成功!");
        if (last == 0) {
          that.uploadImg(++i, tempFilePaths, size, last);
        } else {
          wx.setStorageSync('discernResult', JSON.parse(res.data).data)
          console.log(wx.getStorageSync('discernResult'))

          //更新数据
          wx.request({
            url: app.globalData.localhost + '/api-basicS/search/getCar',
            // url: 'http://localhost:8763/search/getCar',
            data: {
              ids: wx.getStorageSync('discernResult'),
              latitude: that.data.latitude,
              longitude: that.data.longitude
            },
            success: function(res) {
              that.setData({
                discernResult: res.data.entity
              })
              that.displayResult()
            },
            complete: function() {
              wx.hideLoading()
            }
          })
        }
      }
    })
  },
  displayResult: function() {
    const that = this
    var result = wx.getStorageSync('discernResult')
    //显示加载框
    wx.showLoading({
      title: '识别中，请稍等',
      mask: true,
    })
    //异步请求识别数据
    //获取坐标
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        wx.request({
          url: app.globalData.localhost + '/api-basicS/search/getCar',
          // url: 'http://localhost:8763/search/getCar',
          data: {
            ids: result,
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function(res) {
            const ent = res.data.entity
            //为了显示大图手动处理出需要的url数组
            for (let i = 0; i < ent.length; i++) {
              ent[i].picArr = []
              ent[i].carPic = ent[i].carPic.slice(0, 9)
              for (let j = 0; j < ent[i].carPic.length; j++) {
                ent[i].picArr[j] = "http:" + ent[i].carPic[j].imgSrc
              }
            }
            that.setData({
              discernResult: ent
            })

            // wx.createSelectorQuery().selectAll('.car_list_cell').boundingClientRect(function(rect) {
            //   console.log(rect[0].height)
            //   that.setData({
            //     cardHeight: rect[0].height
            //   })
            // }).exec()


          },
          complete: function() {
            wx.hideLoading()
          }
        })
      },
    })
  },
  getCarPhoto: function(e) {
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
  getCarResult(index, id) {
    var that = this
    var param = {};
    var discernResult_pics_string = "discernResult[" + index + "].pics";
    var discernResult_entity_string = "discernResult[" + index + "].carEntity";
    var discernResult_salesmans_string = "discernResult[" + index + "].salesmans";
    wx.request({
      url: 'http://' + app.globalData.localhost + '/api-basicS/search/getCar',
      data: {
        id: id
      },
      success: function(res) {
        var pics = new Array()
        res.data.entity.carPic = res.data.entity.carPic.slice(0, 9)
        for (var i = 0; i < res.data.entity.carPic.length; i++) {
          pics[i] = "http:" + res.data.entity.carPic[i].imgSrc
        }
        console.log(pics)
        param[discernResult_pics_string] = pics;
        param[discernResult_entity_string] = res.data.entity;
        wx.request({
          url: 'http://' + app.globalData.localhost + '/api-basicS/search/getSalesman',
          data: {
            brandId: res.data.entity.carBrand
          },
          success: function(e) {
            param[discernResult_salesmans_string] = res.data.entity;
          }
        })
      }
    })
    that.setData(param)
  },
  navigateToSellShop: function(e) {
    var id = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '../../shop/shop_info/shop_info?id=' + id,
    })
  },
  showPic: function(e) {
    // console.log(e)
    var that = this
    wx.previewImage({
      current: "http:" + e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: that.data.discernResult[that.data.current].picArr // 需要预览的图片http链接列表
    })
  },
  switchTab: function(e) {
    var that = this;
    if(e.currentTarget.dataset.tabid == 2){
      that.setData({
        cardHeight: 1400
      })
    }else{
      that.setData({
        cardHeight: 910
      })
    }
    
    // debugger
    // wx.createSelectorQuery().selectAll('.car_list_cell').boundingClientRect(function (rect) {
    //   debugger
    //   that.setData({
    //     cardHeight: rect[that.data.current_car].height
    //   })
    // }).exec()
    that.setData({
      current_info_tab: e.currentTarget.dataset.tabid
    })
  },
  swiperChange(e) {
    let current = e.detail.current;
    let source = e.detail.source
    //console.log(source);
    console.log(current, this.data.index, this.data.cur)
    this.setData({
      current_car: current
    })
  }
})