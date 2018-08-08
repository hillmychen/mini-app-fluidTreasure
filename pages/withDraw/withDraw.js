// pages/withDraw/withDraw.js
/**
  recipientSite  扫码
  loginInfo      用户信息
  value          数量
  userId         用户id
  num            满多少即可提现
  all_mun        可提现多少
**/ 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipientSite:'',
    loginInfo: {},
    value:'',
    userId:'',
    num:1,
    all_num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var page=this;
    let loginInfo = wx.getStorageSync('loginInfo');
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        // console.log(res.data)
        page.setData({
          userId: res.data
        })
        wx.request({
          url: 'https://liubi.ltd/api/user/center',
          header:{
            'content-type':'application/json'
          },
          data:{
            userId:page.data.userId
          },
          method:"POST",
          success:function(res){
              // console.log(res.data);
              page.setData({
                all_num:res.data.data.moneybag
              })
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
  // 表单提交
  withDrawformSubmit:function(e){
    // console.log(e.detail.value)
    var page=this;
    let formSubmitData = e.detail.value
    if (this.loginInfo){
      formSubmitData.userId = this.loginInfo.uid      
    }
    // if (!formSubmitData.address){
    //   wx.showToast({
    //     title: '请输入接受方地址',
    //     icon:'none'
    //   })
    //   return;
    // } else if (!formSubmitData.number){
    if (!formSubmitData.number){
      wx.showToast({
        title: '请输入提取流宝数量',
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
    } else{
      wx.showLoading({
        title: '请稍后..',
      })
      wx.request({
        url: 'https://liubi.ltd/api/liquid/pay', 
        method:'POST',
        data: {
          userId: page.data.userId,
          address: e.detail.value.address,
          liquid_number: e.detail.value.number,
          password: e.detail.value.password
          },
        header: {
          'content-type': 'application/json' // 默认值
        },
        
        success: function (res) {
          console.log(res)
          page.setData({
            // num:res
          })
          if(res.data.status_code=="000000"){
            wx.hideLoading()
              wx.showToast({
                title: '提取成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function(){
                wx.redirectTo({
                  url: '../center/center',
                })
              },1000)
            }else{
                wx.hideLoading()
                wx.showToast({
                  title: '提取失败',
                  icon: 'none',
                  duration: 2000
                })
              }
        },
       
      })
    }
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
  recipientQrcode:function(){
    wx.scanCode({
      success: (res) => {
        this.setData({
          recipientSite:res.result
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