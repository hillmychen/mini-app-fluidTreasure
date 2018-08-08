// pages/center/withDrawHistory.js
// const app = getApp()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    withDrawList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let page=this;
    wx.showLoading({
      title: '加载中',
    });
    let loginInfo=wx.getStorageSync('loginInfo')
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        page.setData({
          userId: res.data
        })
        wx.request({
          method: 'POST',
          url: 'https://liubi.ltd/api/user/cash/list',
          data: {
            userId: res.data,
            page: page.data.page
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            // console.log(res);

            if (res.data.status_code == "000000") {
              page.setData({
                'withDrawList': res.data.data
              })
              wx.hideLoading();
            }
          },
          fail: function (res) {
            // console.log(res.data)
          }
        })
      },
      fail: function (res) {
        // console.log(res.data)
        wx.navigateTo({
          url: '../authorize/index',
        })
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
  // onShow: function () {
  
  // },

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