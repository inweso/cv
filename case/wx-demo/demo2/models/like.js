/*请求数据模块*/
import HTTP from "../util/http.js";//引入自己封装的http类
class likeModel extends HTTP{//
	like(like_status){//模拟向后端提交数据，修改数据
		this.request({
			url:"/index/like?like_status=" + like_status,
			method:"POST",
			success(res){
				//console.log(res.data)
			}
		});
	}
}
export default likeModel;