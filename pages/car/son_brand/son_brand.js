// pages/car/son_brand/son_brand.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    father_brand:{},
    hidden:[],
    cars:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onload")
    var that = this

    //获得父品牌
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/getBrand',
      data:{
        id: options.id
      },
      success:function(res){
        that.setData({
          father_brand:res.data.entity
        })
      }
    })
    //获取子品牌
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/getSonBrands',
      data: { signature: app.globalData.signature, 
              id:options.id
      },
      success: function (e) {
        
        that.setData({
          brands: e.data.entity
        })
        // console.log(that.data.brands.length)
        for(var i = 0 ; i < that.data.brands.length ; i++ ){
          var param = []
          for(var j = 0 ; j < that.data.brands[i].sonBrands.length ; j++){
            param[j] = true
          }
          that.data.hidden.push(param)
        }
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
  
  },
  // 点击二层品牌，显示第三层品牌
  sonBrand:function(e){
    var that = this
    var id = e.currentTarget.id
    var idx = e.currentTarget.dataset.idx
    var index = e.currentTarget.dataset.index
    // console.log(e)
    var param = {};
    var hidden_string = "hidden[" + idx + "][" + index + "]";
    var car_string = "cars[" + idx + "][" + index + "]";
    // console.log(index)
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/getCars',
      data:{ id : id},
      success:function(e){
        if(that.data.hidden[idx][index]){
          param[hidden_string] = false;
        }else{
          param[hidden_string] = true;
        }
        param[car_string] = e.data.entity;
        console.log(param)
        that.setData(param)
      }
    })
  },
  getCarMess:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../result_car/result_car?id='+e.currentTarget.id,
    })
  }
})