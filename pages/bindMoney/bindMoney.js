// pages/bindMoney/bindMoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    disabled:false,
    address:'请输入钱包地址',
    
  },
  // 钱包绑定
  withDrawformSubmit:function(e){
      var page=this;
      wx.request({
        url: 'https://liubi.ltd/api/user/adress',
        method: 'POST',
        data: {
          user_address:e.detail.value.address,
          userId:this.data.userId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },

        success: function (res) {
          console.log(res);
          if(res.data.status_code=='000000'){
            page.setData({
              disabled:true,
              address: e.detail.value.address
            })
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })
          }
        }
      })
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
        page.setData({
          userId: res.data
        })

        // 获取钱包地址
        wx.request({
          url: 'https://liubi.ltd/api/user/moneybag',
          method: 'POST',
          data: {
            userId: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },

          success: function (res) {
            console.log(res);
            if(res.data.data.length>20){
              page.setData({
                address:res.data.data,
                disabled: true,
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