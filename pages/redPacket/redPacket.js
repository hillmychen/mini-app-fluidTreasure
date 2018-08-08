// pages/redPacket/redPacket.js
var app = getApp();
var red_id;
var userId;
var red_type;
var red_userId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    red_all:0,
    headUrl: '',
    myName:'',
    num: 1,
    rid:null,
    all_num:0,
    get_num:0,
    user_name:'hehe',
    get_time:'2018-06-25 15:20:30',
    user_headUrl:'',
    redModalShow:false,
    red_txt:'恭喜发财，大吉大利',
    tiqu_url:'../index/index',
    userId:'',
    riqu_txt:'我也要发流宝',
    red_id:'',
    personage:{},
    red_list:{},
    red_type:2,
    success:1,
    get_num:0
  
  },
  reindex:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  // 领红包
  open_red:function(){
    var page = this;
    this.setData({
      "redModalShow":false
    })
    // 抢红包
    wx.request({
      url: 'https://liubi.ltd/api/red/user/get',
      method: 'POST',
      data: {
        userId: userId,
        rid: red_id

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        //获取红包列表
        wx.request({
          url: 'https://liubi.ltd/api/red/detail',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: {
            rid: red_id

          },
          success: function (res) {
            console.log(res);
            wx.setStorage({
              key: 'red_list',
              data: res.data.data,
            })
            page.setData({
              red_list: res.data.data
            })
          }
        })
        //将红包id放到缓存
        wx.setStorage({
          key: 'red_id',
          data: red_id,
          sunccess:function(){
            console.log('成功放到缓存')
          }
        })
        
        if (res.data.status_code == '000000'){
          page.setData({
            success:1,
            get_num:res.data.data
          })
          wx.setStorage({
            key: 'get_num',
            data: res.data.data,
            sunccess: function () {
             
            }
          })

        }
        else if(res.data.status_code=='600006'){
          page.setData({
            success: 2
          })
          wx.showToast({
            'title': res.data.message,
            'icon': 'none'
          })
         
        }
        else{
          page.setData({
            success: 2
          })
          wx.showToast({
            'title': res.data.message,
            'icon':'none'
          })
        }
       
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
  
    var page = this;
    var pages = getCurrentPages() //获取加载的页面

    var currentPage = pages[pages.length - 1] //获取当前页面的对象

    red_id = currentPage.options.red_id //获取当前红包id
    red_type = currentPage.options.red_type //获取红包类型
    red_userId = currentPage.options.red_userId//获取发红包用户id
    console.log(currentPage.options);
    
    page.setData({
      red_all: currentPage.options.red_all//获取红包总数；
    })
    
    page.setData({
      red_type:red_type
    })
    
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        userId=res.data
        // console.log(userId);
        wx.request({
          url: 'https://liubi.ltd/api/detail/red/list',
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            userId: red_userId
          },
          success: function (res) {
            // console.log(res.data);
            page.setData({
              personage:res.data.data
            })
           
          }
        })
      },
      fail: function (res) {
        // console.log(res.data)
        // 查看是否授权
        wx.getSetting({
          success: function (res) {
            // 如果已经授权
            if (res.authSetting['scope.userInfo']) {
              // 判断是否有缓存
              // 有缓存，直接读取缓存信息
                wx.login({
                  success: function (res) {
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
                          wx.getUserInfo({
                            success: function (res) {
                              // console.log(res.userInfo)
                              wx.setStorageSync('loginInfo', res.userInfo)
                            }
                          })
                            wx.setStorage({
                              key: "userId",
                              data: userRes.data.data.uid,
                            })
                         
                        },
                        fail: function (e) {
                          console.log(e)
                          wx.hideLoading()

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
              
            } else {
              // 没有授权，跳转授权页面
              wx.navigateTo({
                url: '../authorize/index',
              })
            }
          }
        })
      }
    })
    

    //判断缓存是否有红包id
    wx.getStorage({
      key: 'red_id',
      success: function(res) {
        console.log(res.data)
        console.log(currentPage.options.red_id)
        if (res.data != currentPage.options.red_id){
          page.setData({
            redModalShow:true
          })
        } else if (res.data == currentPage.options.red_id){
          // 再次进入获取红包列表
          page.setData({
            redModalShow: false
          })
          wx.getStorage({
            key: 'get_num',
            success: function(res) {
              get_num:res.data
            },
          })
          console.log('再次进入')
          wx.request({
            url: 'https://liubi.ltd/api/red/detail',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            data: {
              rid: res.data
 
            },
            success: function (res) {
              console.log(res);
              page.setData({
                red_list: res.data.data
              })
            }
          })
         
        }
      },
      fail:function(res){
        page.setData({
          redModalShow: true
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