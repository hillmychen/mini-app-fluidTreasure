// pages/center/passwordConfig.js
var app = getApp();
var passwor;
var userId
var reg = /^[0-9]+.?[0-9]*$/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    valpass:"",
    valcon:"",
    userId:"",
    inputData:null

  },
  
  set_pass:function(e){
    if (!reg.test(e.detail.value) || e.detail.value.length<6){
      wx.showToast({
        title: '密码必须位数字且6位',
        icon: 'none'
      })
        return;
    }
    this.setData({     
      valpass:e.detail.value
    })
  },
  con_pass: function (e) {
    if (!reg.test(e.detail.value) || e.detail.value.length < 6) {
      wx.showToast({
        title: '密码必须位数字且6位',
        icon: 'none'
      })
      return;
    }
    this.setData({
      valcon: e.detail.value
    })
  },
  // 获取密码
  inputAmount: function (e) {
    // console.log(e)
    var id = e.currentTarget.dataset.id;
    let newInputData = e.detail.value;
   var data = {};
   data[id] = newInputData;
   this.setData(data);
  },
  sub:function(){
    if (this.data.valpass != this.data.valcon || this.data.valpass.length<6){
        wx.showToast({
          title:'两次密码不一致',
          icon:'none'
        })
        return;
      }
      else{
          wx.request({
            url: 'https://liubi.ltd/api/user/pwd/store',
            method:"POST",
            data:{
              userId: userId,
              old_pwd: this.data.valcon,
              },
            header:{
              "content-type":"application/json"
            },
            success:function(res){
              // console.log(res);
              if(res.data.status_code=="000000"){
                wx.showToast({
                  title: '修改成功',
                  icon: "success"
                });
                // wx.navigateTo({
                //   url: 'center',
                // })
              }
              else{
                wx.showToast({
                  title: res.data.message,
                  icon:'none'
                })
               
              }


            }
          })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var page = this;
    //查看缓存用户信息
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        // console.log(res.data);
        userId=res.data
        page.setData({
          userId: res.data
        })
      },
      fail: function (res) {
        // console.log(res.data)
        wx.navigateTo({
          url: '../authorize/index',
        })
      }
    })
    let loginInfo = wx.getStorageSync('loginInfo');
    
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