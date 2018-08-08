// pages/center/center.js
var app = getApp();
var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myName: "",
    headUrl: '',
    fishCount: 0,
    userId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    var page = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res.data)
        page.setData({
          userId: res.data
        })
        wx.request({
          url: 'https://liubi.ltd/api/user/center',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
            page.setData({
              fishCount:res.data.data.moneybag,
              myName: res.data.data.nickname,
              headUrl: res.data.data.headimgurl
            })
            wx.hideLoading()
            // console.log(page.data.fishCount)
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