// components/like/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		like:{
			type:Number,
			observer(){//监控属性的变动

			}
		},
		count:{
			type:Number,
			value:0
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
		likeit(event){
			this.setData({
				count : this.properties.like ? this.properties.count-1 : this.properties.count+1,
				like : !this.properties.like
			});
			let like_status = this.properties.like ? true : false;//将组件的like状态保存到一个变量
			this.triggerEvent("like",{//触发触发父元素的自定义事件（bindlike），并将数据传递给事件
				like_status:like_status//将是否已经点赞的状态传递给事件
			},{});

		},
	}
})
