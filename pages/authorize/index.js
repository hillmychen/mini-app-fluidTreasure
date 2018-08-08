// pages/authorize/index.js
var app = getApp();

var userId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  
  },
  bindGetUserInfo: function (e) {
    // console.log(e);
    // console.log(e.detail.userInfo)
    if (!e.detail.userInfo){
      return;
    }
    var that = this;
    // // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success: function (res) {
            // console.log(res);
              // console.log(res.code)
              if (res) {
                wx.request({
                  url: 'https://liubi.ltd/api/login/xcx',
                  method: 'POST',
                  data: {
                    code: res.code
                  },
                  success: function (userRes) {
                    // console.log(userRes)
                    try {
                      //将用户信息保存的缓存里面
                      wx.setStorageSync('userInfo', e.detail.userInfo)
                      // console.log(e.detail.userInfo)
                    } catch (e) {
                    }
                      wx.setStorage({
                        key: "userId",
                        data: userRes.data.data.uid,
                      })
                    // wx.getStorage({
                    //   key: 'userId',
                    //   success: function (res) {
                    //     console.log(res.data)
                    //   }
                    // })
                    // 返回上一层
                    wx.navigateBack();
                  },
                  fail:function(e){
                   wx.showToast({
                     title: '授权失败',
                     icon:'none'
                   })
                    
                  }
                })
              } else {
                // 登录错误
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '无法登录，请重试',
                  showCancel: false
                })
                return;
              }
            }
          })
        }
      }
    })
  },
 
})