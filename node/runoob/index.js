//使路由函数被注入到服务器中
var server = require("./server");
var router = require("./router");

server.start(router.route);