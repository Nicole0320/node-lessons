### 关于 async.maplimit() 方法中的 callback

```
async.mapLimit(topicUrls, 5, function(url, callback){
    getInfoFromEachUrl(url, callback) //从单个URL中抓取信息的处理函数
}, function(err, result){
    console.log(result);
})
```

一开始不理解 `async.mapLimit` 方法中，第三个 `function` 参数中的第二个参数 `callback`，以及单个URL处理函数（也就是我自己写的 `getInfoFromEachUrl` 函数，为什么一定要有一个参数 `callback`，后来通过来回调试，理解到：

`async.mapLimit` 方法可接受4个参数：要处理的URL数组、并发请求的最大限制数、回调函数1、回调函数2。

其中，回调函数1应该是对数组中每个URL的处理操作，这个回调函数提供两个形参：当前处理的URL，以及一个`callback`函数。这个URL就是当前处理的URL，可以作为实参传入你自己的处理函数中。第二个参数 `callback` 是 `async` 提供的，接受两个参数 `(err, res)`，当正常执行时，会将异步的结果放入 `result` 数组，也就是`async.mapLimit`的第四个参数（回调函数2）中的第二个参数 `result`，当所有异步任务都执行完成后，就可以从这里（回调函数2）中获得最终的异步结果 `result` 的值。
