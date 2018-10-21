import behavior from "../behavior.js";
Component({
  /**
   * 组件的属性列表
   */
   behaviors:[behavior],
  properties: {
   /* imageUrl:{
      type:String,
    },
    content:{
      type:String
    }*/
  },

  /**
   * 组件的初始数据
   */
  data: {
    musicTitleImg:"../../images/music_text.png",
    play:"../../images/play.png",
    pause:"../../images/pause.png",
    playing:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play(){
      this.setData({
        playing:!this.data.playing
      });
    },
    pause(){
       this.setData({
        playing:!this.data.playing
      });
    }
  }
})
