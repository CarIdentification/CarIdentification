// pages/car/son_brand/son_brand.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    father_brand:{},
    hidden:[],
    cars:[],
    //记录各子品牌加载到第几页
    carIndex:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onload")
    var that = this

    //获得父品牌
    wx.request({
      url: 'http://' + app.globalData.localhost +'/api-basicS/search/getBrand',
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
      url: 'http://' + app.globalData.localhost +'/api-basicS/search/getSonBrands',
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
          var index = []
          var car = []
          for(var j = 0 ; j < that.data.brands[i].sonBrands.length ; j++){
            param[j] = true
            index[j] = 0
            car[j] = undefined
          }
          that.data.hidden.push(param)
          that.data.carIndex.push(index)
          that.data.cars.push(car)
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
    var param = {};
    var hidden_string = "hidden[" + idx + "][" + index + "]";
    var car_string = "cars[" + idx + "][" + index + "]";
    //下拉栏收缩
    if (that.data.hidden[idx][index]){
      
      //记录子品牌加载到第几页
      var load_index = that.data.carIndex[idx][index];
      var car_Index = "carIndex[" + idx + "][" + index + "]";

      //如果没有获取过数据
      if(that.data.cars[idx][index]==undefined){
        wx.request({
          url: 'http://' + app.globalData.localhost +'/api-basicS/search/getCars',
          data: {
            id: id,
            pageNum: load_index
          },
          success: function (e) {

            param[hidden_string] = false;

            console.log(e.data.entity.cars.length)
            if (e.data.entity.cars.length != 0) {
              param[car_string] = e.data.entity.cars;
              param[car_Index] = e.data.entity.pageNum;
              console.log(param)
              that.setData(param)
            }

          }
        })
      }
      //获取过则直接展示
      else{
        param[hidden_string] = false;
        that.setData(param)
      }
    }else{
      //下拉栏已展开
      if (!that.data.hidden[idx][index]) {
        param[hidden_string] = true;
        that.setData(param)
      }
    }
  },
  getCarMess:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../result_car/result_car?id='+e.currentTarget.id,
    })
  },
  downCar:function(e){
    var that = this
    var id = e.currentTarget.dataset.fatherid
    var idx = e.currentTarget.dataset.idx
    var index = e.currentTarget.dataset.index
    var param = {};
    // debugger
    if(that.data.carIndex[idx][index] != -1){
      //记录子品牌加载到第几页
      var load_index = that.data.carIndex[idx][index];
      var car_Index = "carIndex[" + idx + "][" + index + "]";
      var cars = "cars[" + idx + "][" + index + "]";
      wx.request({
        url: 'http://' + app.globalData.localhost +'/api-basicS/search/getCars',
        data: {
          id: id,
          pageNum: load_index
        },
        success: function (e) {
          // debugger
          if (e.data.entity.cars.length != 0) {
            //增加汽车
            var carList = that.data.cars[idx][index]
            for(var i = 0 ; i < e.data.entity.cars.length ; i++){
              carList.push(e.data.entity.cars[i])
              
            }
            param[car_Index] = e.data.entity.pageNum;
            param[cars] = carList;
            console.log(param)
            that.setData(param)
          }

        }
      })
    }
  }
})