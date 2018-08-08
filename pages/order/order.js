// pages/order/order.js
var usrId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_det:'',
    order_address:''
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
    var page = this;
    wx.getStorage({
      key: 'userId',
      success: function (res_id) {
        
        wx.request({
          url: 'https://liubi.ltd/api/get/order/info',
          method: 'POST',
          data: {
            userId: res_id.data,
            
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            // console.log(res);
            page.setData({
              order_det:res.data.data.ordersn,
              order_address: res.data.data.userAddress
            })

            // wx.request({
            //   url: 'https://liubi.ltd/api/user/order/sn',
            //   method: 'GET',
            //   data: {
            //     userId: res_id.data,

            //   },
            //   header: {
            //     'content-type': 'application/json' // 默认值
            //   },
            //   success: function (res) {
            //     console.log(res);

            //   }
            // })


          }
        })
      },

      // fail: function (res) {
      //   console.log(res)
      //   wx.navigateTo({
      //     url: '../authorize/index',
      //   })
      // }
    })
    
  
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
})