/*请求数据模块*/
import HTTP from "../util/http.js";//引入自己封装的http类
class getDataModel extends HTTP{//继承HTTP类，这里不需要实例化，内部使用this指向类，在页面中调用类的方法才需要实例化对象
	getLatest(callback){//通过回调函数返回数据给页面，获取最新期刊
		this.request({
			url:"/index/latest/7",
			success:(res)=>{
				callback(res);
				this._setLatestIndex(res.data.index);
				wx.setStorageSync(this._getKey(res.data.index),res);
			}
		});
	}

	getJournal(index, callback, where){//获取上一个或下一个期刊
		//实现本地缓存，本地没有数据再从服务器获取
		let key = this._getKey(parseInt(index)+where);
		let journal = wx.getStorageSync(key);
		if(!journal){//如果本地没有数据，将获取到的下一个或上一个数据存放到本地
			this.request({
				url:"/index/latest/"+(parseInt(index)+where),
				success:(res)=>{
					callback(res);
					wx.setStorageSync(this._getKey(res.data.index),res);
				}
			});
		}else{
			callback(journal);
		}
	}

	isFirst(index){//判断是否第一条数据
		return index==5?true:false;
	}
	isLatest(index){//判断是否最后一条数据
		return index==this._getLatestIndex() ? true : false;
	}

	_setLatestIndex(index){//存入最后一条数据的index
		wx.setStorageSync("latest",index);//去掉Sync就是异步操作
	}
	_getLatestIndex(){
		let latestIndex = wx.getStorageSync("latest");
		return latestIndex;
	}

	_getKey(index){
		return "journal-" + index;
	}
}
export default getDataModel;