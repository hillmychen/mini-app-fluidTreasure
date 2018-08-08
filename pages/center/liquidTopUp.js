// pages/center/liquidTopUp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // topUpMoney:0,
    // loginInfo:{},
    // userId:null,
    // passwordModalShow: false,
    // recipientSite: '',
    // value: '',
    // num: 1000
   
  },
  withDrawformSubmit: function (e){
    // console.log(e.detail.value)
    var page = this;
    let formSubmitData = e.detail.value
    // if (this.loginInfo) {
    //   formSubmitData.userId = this.loginInfo.uid
    // }
    // if (!formSubmitData.address) {
    //   wx.showToast({
    //     title: '请输入充值方地址',
    //     icon: 'none'
    //   })
    //   return;
    // }
     if (!formSubmitData.number) {
      wx.showToast({
        title: '请输入流宝数量',
        icon: 'none'
      })
      return;
    }
    
    else if (!formSubmitData.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return;
    } else {
      wx.request({
        url: 'https://liubi.ltd/api/recharge/store',
        method: 'POST',
        data: {
          userId: page.data.userId,
          // userId: 59,
          user_money: e.detail.value.number,
          // address:e.detail.value.address,
          password:e.detail.value.password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },

        success: function (res) {
          // console.log(res)
          if(res.data.status_code=='000000'){
            wx.navigateTo({
              url: '../order/order',
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })
            return;
           
          }
         
          
          // if (res.data.status_code == "000000") {
            
          //   wx.showToast({
          //     title: '充值成功',
          //     icon: 'success',
          //     duration: 2000
          //   })
          // } else {
          //   wx.showToast({
          //     title: res.data.message,
          //     icon: 'none',
          //     duration: 2000
          //   })
          // }
        },

      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var page = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        // console.log(res.data)
        page.setData({
          userId: res.data
        })
      },
     
      fail: function (res) {
        // console.log(res)
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
  
  },
  // 关闭模态框
  // modalCancel: function () {
  //   this.setData({
  //     'passwordModalShow': !this.data.passwordModalShow
  //   })
  // },
  // 流币充值
  // topUpLQD:function(e){
  //   this.setData({
  //     'topUpMoney':e.detail.value
  //   })
  //   // console.log(this.data.topUpMoney)
  // },
  // payNow:function(){
  //   var page=this;
  //   if(this.data.topUpMoney<=0){
  //     wx.showToast({
  //       title: '充值金额必须大于0',
  //       icon:'none'
  //     })
  //     return;
  //   }
  //   this.setData({
  //     passwordModalShow: !this.data.passwordModalShos
  //   })
   
  // },
  // payCancel:function(){
  //   wx.redirectTo({
  //     url: './center',
  //   })
  // }
})