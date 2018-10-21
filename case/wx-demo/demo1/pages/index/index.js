//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: ['../../images/swiper1.jpg', '../../images/swiper2.jpg', '../../images/swiper3.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    proData: [{
        id: "1",
        imgUrl: "../../images/pro_01.jpg",
        title: "精英贷",
        content: "22周岁以上即可\n最快3小时下款\n均8万，最高20万"
      },
      {
        id: "2",
        imgUrl: "../../images/pro_02.jpg",
        title: "月供贷",
        content: "不看工作，不看流水\n不限地区\n最高150万"
      },
      {
        id: "3",
        imgUrl: "../../images/pro_03.jpg",
        title: "保单贷",
        content: "凭样板征信和保单官网帐号密码即可\n最高150万"
      }
    ],
    btnDetail: "../../images/btn_detail.png",
    btnOnline: "../../images/btn_ask.png"
  },
  onLoad: function() {},
  toDetail(e) {
    var id = e.currentTarget.dataset.id;
		app.globalData.postId = id;
    wx.navigateTo({
      url: "../detail/detail?id="+id//通过地址传值{id:1}
    });
		console.log(app.globalData.postId)
  }
})