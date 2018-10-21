//index.js
//获取应用实例
import getDataModel from "../../models/getData.js";
import LikeModel from "../../models/like.js";
let getData = new getDataModel();
let likeIt = new LikeModel();
const app = getApp()

Page({
	data:{
		data:null,
		latest:true,
		first:false,
	},
	onLoad: function () {
		getData.getLatest((res)=>{
			this.setData({
				data:res.data
			});
		});
	},
	onlike(event){//自定义事件，接收子组件传递的数据
		let like_status = event.detail.like_status;
		likeIt.like(like_status);
	},
	getJournal(where){
		getData.getJournal(this.data.data.index,(res)=>{
			this.setData({
				data:res.data,
				latest:getData.isLatest(res.data.index),
				first:getData.isFirst(res.data.index)
			});
		},where);
	},
	onPrevious(){
		this.getJournal(1);
	},
	onNext(){
		this.getJournal(-1);
	}
})
