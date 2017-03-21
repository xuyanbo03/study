// 引入 events 模块
var events=require('events');
// 创建 eventEmitter 对象
var eventEmitter=new events.EventEmitter();

// 创建事件处理程序
var connectHandle = function connected(){
    console.log('连接成功');
    eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection',connectHandle);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received',function(){
    console.log('接收成功');
})

// 触发 connection 事件
eventEmitter.emit('connection');
console.log("End");