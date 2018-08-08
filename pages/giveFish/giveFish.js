// pages/giveFish/giveFish.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    num2:'',
    txt:'',
    loading: false,
    red_type:2,
    userId:null,
    red_id:null,
    tapTitle: [
      {
        'title': "拼手气流宝",
        'id':'luckFishGold',
      },
      {
        'title': '普通流宝',
        'id': 'normalFishGold'
      }
    ],
    inputData:{},
    tapData: { currentIndex:0, countTitle:'总数量'},
    passwordModalShow: false,
    redModalShow:false,
    loginInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var page = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        page.setData({
          userId: res.data
        })
      },
      fail: function (res) {
        // console.log(res.data)
        wx.redirectTo({
          url: '../authorize/index',
        })
      }
    })

    let loginInfo = wx.getStorageSync('loginInfo');
    this.setData({
      loginInfo:loginInfo
    })
  },
  // 标签切换
  heheTapFish:function(e){
    var self=this;
    var fishId = e.currentTarget.id;
    if (fishId == "luckFishGold"){
      self.setData({
        'tapData.countTitle':'总数量',
        'tapData.currentIndex':0,
        'red_type':2
        
      })
      // console.log(this.data.red_type);
    } else if (fishId == "normalFishGold"){
      self.setData({
        'tapData.countTitle': '单个数量',
        'tapData.currentIndex':1,
        'red_type':1
      })
      // console.log(this.data.red_type);
      
    }
    // console.log(self.data.tapData);    
  },
  // 获取输入框值
  inputAmount:function(e){
    // console.log(e)
    let input_id = e.currentTarget.dataset.id
    let input_val=e.detail.value
    let newInputData = this.data.inputData;
    newInputData[input_id] = input_val
    this.setData({
      'inputData': newInputData
    })
   
  },
  // 生成红包
  generateRedEnvelopes:function(){
    
    if (!this.data.inputData["input_fish_num"]){
      wx.showToast({
        title: '请输入'+this.data.tapData.countTitle,
        icon: 'loading',
        duration: 1000
      });
      return;
    } else if (!this.data.inputData["input_amount"]){
      wx.showToast({
        title: '请输入鱼宝个数',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
    // else if(this.data.inputData.input_fish_num%10!=0){
    //     wx.showToast({
    //       "title": "总数必须为10的倍数",
    //       "icon":"none"
    //     })
    //     return;
    // }
    else{
      this.setData({
        'passwordModalShow': !this.data.passwordModalShow
      })
    }
   
  },
  
  // 发红包
  confirmGenerateRedEnvelopes:function(e){
    var page=this;
    // console.log(page.data.userId);
    wx.request({
      url:'https://liubi.ltd/api/redpacket/store/sendred',
      method:'POST',
      data:{
        userId: page.data.userId,
        red_money: page.data.inputData.input_fish_num,
        red_num: page.data.inputData.input_amount,
        title:page.data.txt,
        red_type:page.data.red_type,
        password: page.data.inputData.input_password
        
      },
      header:{ 
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res)
        page.setData({
          red_id:res.data.red_id
        })
        if(res.data.status_code=="500004"){
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
          return;
        }else if(res.data.status_code=="000000"){
          // wx.setStorage({
          //   key: "red_id",
          //   data: res.data.red_id,
          // })
          // wx.getStorage({
          //   key: 'red_id',
          //   success: function (res) {
          //     // console.log(res.data);
          //   },
          // })
          page.setData({
            'passwordModalShow': !page.data.passwordModalShow,
            'redModalShow': !page.data.reddModalShow
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
      
  },

  

  // 关闭模态框
  modalCancel:function(){
    this.setData({
      'passwordModalShow': !this.data.passwordModalShow
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
  onShow: function () {
    var page = this;
    //查看缓存用户信息
    wx.getStorage({
      key: 'userId',
      success: function (res) {
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
    // let loginInfo = wx.getStorageSync('loginInfo');
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
  onShareAppMessage: function (e) {
    var page=this
    // console.log(page.data.userId)
      if(e.from==='button'){
      return{
        title:'收到一个流宝红包',
        path: '/pages/redPacket/redPacket?red_id=' + page.data.red_id + '&red_type=' + page.data.red_type + '&red_all=' + page.data.inputData.input_amount + '&red_userId=' + page.data.userId,
        imageUrl:'../../assets/img/logo2.png',
        success:function(res){
          // console.log(page.data.red_id);
          page.setData({
            redModalShow: !page.data.redModalShow
          })
          wx.redirectTo({
            url: '../redPacket/redPacket?red_id=' + page.data.red_id + '&red_type=' + page.data.red_type + '&red_all=' + page.data.inputData.input_amount + '&red_userId=' + page.data.userId,
          })
        }
      }

    }
  }
})