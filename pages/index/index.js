//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
var userInfo = getApp().globalData.userinfo
var userId;
Page({
  data:{
    myName:"",
    headUrl:'',
    fishCount:0,
    userId:''
  },
  onShow:function(e){
    
    let page = this;
    wx.showLoading({
      title: '加载中',
    });
     // 查看是否授权
    wx.getSetting({
      success: function (res) {
        // 如果已经授权
        if (res.authSetting['scope.userInfo']){
          // 判断是否有缓存
          // 有缓存，直接读取缓存信息
          if (userInfo) {
            // console.log('已有缓存')
            // console.log(userInfo)
            page.setData({
              'myName': userInfo.nickName,
              'headUrl': userInfo.avatarUrl
            })
            wx.hideLoading()
          }else{
            // console.log('没有缓存')
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
                      // 将用户id存到缓存里面
                      wx.setStorage({
                        key: "userId",
                        data: userRes.data.data.uid,
                      })

                      // 请求流宝信息
                      wx.request({
                        url: 'https://liubi.ltd/api/user/center',
                        method: 'POST',
                        data: {
                          userId: userRes.data.data.uid
                        },
                        header: {
                          'content-type': 'application/json' // 默认值
                        },
                        success: function (res) {
                          // console.log(res)
                          page.setData({
                            fishCount: res.data.data.moneybag
                          })
                        }
                      });
                      wx.getUserInfo({
                        success: function (res) {
                          // console.log(res.userInfo)
                          // 发送用户信息
                          wx.request({
                            url: 'https://liubi.ltd/api/userinfo/update',
                            header: {
                              'content-type': 'application/x-www-form-urlencoded'
                            },
                            method: "POST",
                            data: {
                              uid: userRes.data.data.uid,
                              headimgurl: res.userInfo.avatarUrl,
                              nickname: res.userInfo.nickName
                            },
                            success: function (res) {
                              // console.log(res)
                            }
                          })
                          
                          wx.setStorageSync('loginInfo', res.userInfo)
                          page.setData({
                            'myName': res.userInfo.nickName,
                            'headUrl': res.userInfo.avatarUrl
                          })
                          wx.hideLoading()
                        }

                      })
                      

                     
                    },
                    fail: function (e) {
                      // console.log(e)
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
          }
        } else {
          // 没有授权，跳转授权页面
          wx.hideLoading()
          wx.navigateTo({
            url: '../authorize/index',
          })
        }
       
        
       
      }
    })
  },
 
  goLoginPageTimeOut: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)
  },
  //下拉刷新
  onPullDownRefresh:function()
  {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    //模拟加载
    setTimeout(function()
    {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  }

})
