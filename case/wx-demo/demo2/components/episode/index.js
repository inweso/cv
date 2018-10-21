// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number,
      observer(newVal,oldVal,changedPath){//newVal是父组件传递的数据，oldVal是初始化的数据，changedPath是字段名
        this.setData({//不能直接修改properties的index，需要将index传递给data的_index，因为observer函数是监控字段变化的，每一次变化都是触发，也就是变成了无限递归。
          _index:newVal<10 ? "0"+newVal : newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",],
    _index:null,
    month:null,
    year:null
  },

  attached(){//生命周期，组件进入节点树时执行
    this.setData({
      month:this.data.months[new Date().getMonth()],
      year:new Date().getFullYear()
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
