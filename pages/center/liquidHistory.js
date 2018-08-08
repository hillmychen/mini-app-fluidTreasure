// pages/center/liquidHistory.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    temp1: false,
    temp2:false,
    show:true,
    hidden:false,
    page: 0,
    data1:[],
    data2:[],
    userId:null,
    openid:null,
    core:null
  
  },
  sel:function(e){
    var page=this
    this.setData({
      id: e.currentTarget.dataset.id
    })
    if (this.data.id == 1) {
      // console.log(1)
      // var page = this;
      // wx.request({
      //   url: 'https://liubi.ltd/api/red/list',
      //   method: "POST",
      //   data: {
      //     userId: page.data.userId
      //   },
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     if (res.data.data.length>1) {

            
      //     }
      //   }
      // })
    }
    if(this.data.id==2){
      
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: 'https://liubi.ltd/api/red/store',
        method:"POST",
        data:{
          userId: page.data.userId
        },
        header: {
          'content-type': 'application/json' 
        },
        success:function(res){
          // console.log(res);
          if (res.data.data.length>1) {
            page.setData({
                data2:res.data.data
            })
            wx.hideLoading()
            // console.log(page.data.data2);
          }else{
            page.setData({
              temp2: true
            })
            wx.hideLoading()
          }
        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var page=this
    wx.showLoading({
      title: '加载中',
    });
    wx.getStorage({
      key: 'userId',
      success: function (res) {
          page.setData({
            userId:res.data
          })
          wx.request({
            url: 'https://liubi.ltd/api/red/list',
            method: "POST",
            data: {
              userId: res.data,
              page:2
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              if (res.data.data.length > 1) {
                page.setData({
                  data1: res.data.data

                })
                wx.hideLoading();
                // console.log(page.data.data1);
              }else{
                page.setData({
                  temp1: true
                })
              }
            }
          })
          // console.log(page.data.userId);
      },
      fail: function (res) {
        // console.log(res.data)
        wx.navigateTo({
          url: '../authorize/index',
        })
      }
    })
    var loginInfo = wx.getStorageSync("userInfo");
    // console.log(loginInfo)
   
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