var express = require('express');
var app = express();

app.get('/',function(req, res){    
    res.send('Hello World!')
})

//监听本机3000端口
app.listen(3000, function(){
    console.log('app is listening at port 3000');
    console.log('open http://localhost:3000 in your browser.')
})