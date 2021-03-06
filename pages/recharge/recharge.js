// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    temp1:true
  
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
      success: function (res) {
        // console.log(res.data)
        wx.request({
          url: 'https://liubi.ltd/api/order/list',
          header: {
            'content-type': 'application/json'
          },
          method:'POST',
          data: {
            userId:res.data
          },
          success:function(res){
            console.log(res);
            if(res.data.data.length>0){
              page.setData({
                temp1:false,
                list:res.data.data
              })
            }
          }
        })
      }
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