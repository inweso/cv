/*wc.request封装*/
import config from "../config.js";

class http{
	request(params){
		wx.request({
			url : config.api_base_url + params.url,
			method : params.method ? params.method : "GET",
			data : params.data,
			header : {
				"content-type" : "application/json"
			},
			success : (res)=>{
				let code = res.statusCode.toString();
				if(code.startsWith("2")){
					params.success && params.success(res);//先判断是否存在再执行
				}else{
					wx.showToast({
						title:"数据接口调用失败"
					});
				}
			},
			fail : (res)=>{
				wx.showToast({
						title:"无法连接"
					});
			}
		});
	}
}

export default http;