//引入依赖
var express = require('express');
var utility = require('utility');

//建立express实例
var app = express();
app.get('/', function(req, res){
    var q = req.query.q;
    if(q === undefined){
        res.send('your request head has no q value');
    }
    else{
        var md5Value = utility.md5(q);
        res.send(md5Value);
    }
})

app.listen(3000,function(){
    console.log('app is running at port 3000')
})