//模拟服务器
let http = require('http');
let url = require("url");
let fs = require("fs");

let slides = require("./slides.js");

function read(callback){//读取文件数据
	fs.readFile("./book.json","utf-8",function(err,data){
		if(err || data.length==0){//如果错误或空，传入空数组
			callback([]);
		}else{//否则，将获取的json字符串转换为对象
			callback(JSON.parse(data));
		}
	});
}

function write(data,callback){//写入文件
	fs.writeFile("./book.json",JSON.stringify(data),callback);
}

let page_size = 5;

http.createServer(function (request, response) {//创建服务器
	//跨域请求头部
	//response.setHeader("Content-Type", "application/json; charset=utf-8");
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	response.setHeader("X-Powered-By",' 3.2.1')
	if(request.method=="OPTIONS") return response.end();

	let {pathname,query} = url.parse(request.url,true);//true把query转为对象

	if(pathname === "/page"){//下拉加载更多
		let offset = parseInt(query.offset) || 0;
		read(function(books){
			let result = books.reverse().slice(offset,offset+page_size);
			let hasMore = true;
			if(books.length<offset+page_size){
				hasMore = false;
			}
			setTimeout(function(){//模拟数据延迟
				response.end(JSON.stringify({hasMore,books:result}))
			},500);
		});
		return;
	}

	if(pathname === "/slides"){
		response.end(JSON.stringify(slides));
		return;
	}

	if(pathname === "/hot"){
		read(function(books){
			let hot = books.reverse().slice(0,6);//将图书列表倒序并截取
			setTimeout(function(){response.end(JSON.stringify(hot))},1000);//为了演示数据没加载完之前的loading效果
		});
		return;
	}

	if(pathname === "/book"){
		let id = query.id;//取出的是字符串，不能在这里转换成数值，否则如果参数是其他符号，会走else代码获取到所有数据
		switch (request.method){
			case "GET":
				if(id){
					read(function(books){
						let book = books.find(item=>item.bookId===parseInt(id));
						if(!book){
							book = {};
						}
						response.end(JSON.stringify(book));
					})
				}else{//获取所有图书
					read(function(books){
						response.end(JSON.stringify(books));
					});
				}
				break;
			case "POST":
				let str = "";
				request.on("data",function(chunk){
					str += chunk;
				});
				request.on("end",function(){
					let book = JSON.parse(str);
					read(function(books){
						book.bookId = books.length?books.length+1:1;
						books.push(book);
						write(books,function(){
							response.end(JSON.stringify(book));
						});
					});
				});
				break;
			case "PUT":
				if(id){
					let str = "";
					request.on("data",function(chunk){//接收请求体数据，保存到str
						str += chunk;
					});
					request.on("end",()=>{//完成接收，处理数据
						let book = JSON.parse(str);
						read(function(books){
							books = books.map(item=>{
								if(item.bookId==id){//找到id相同的书，替换
									return book;
								}
								return item;//其他书正常返回。
							});
							write(books,function(){//写入到JSON文件
								response.end(JSON.stringify(book));
							});
						});
					});
				}
				break;
			case "DELETE":
				read(function(books){
					books = books.filter(item=>item.bookId!=id);
					write(books,function(){//如果没有返回空对象的回调函数，前台删除了数据也不会即时更新
						response.end(JSON.stringify({}));
					});
				});
				break;
		}
		return;
	}
	fs.stat("."+pathname,function(err,stats){
		if(err){
			response.statusCode = 404;
			response.end("NOT FOUND");
		}else{
			fs.createReadStream("."+pathname).pipe(response);
		}
	});
}).listen(3000);


