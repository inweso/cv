import behavior from "../behavior.js";
Component({
  /**
   * 组件的属性列表
   */
   behaviors:[behavior],//可以引用多个公共数据，后面覆盖前面，本身覆盖引用，不会覆盖生命周期的函数
  properties: {//引用数据后properties的数据就可以不要了
    /*imageUrl:{
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
    essayTitleImg:"../../images/essay_text.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
