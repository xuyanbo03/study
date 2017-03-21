//第一种方式：匿名函数实现http服务器
var http = require("http");

http.createServer(function (request,response){
    response.writeHead(200,{
        'Content-Type': 'text/plain'
    });
    response.end('Hello World\n');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');


//第二种方式：正常调用函数实现http服务器
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);