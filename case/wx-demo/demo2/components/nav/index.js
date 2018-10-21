// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    first:{
      type:Boolean
    },
    latest:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event){
      if(!this.properties.latest){
        this.triggerEvent("left",{},{});
      }
    },
    onRight(event){
      if(!this.properties.first){
        this.triggerEvent("right",{},{});
      }
    }
  }
})
