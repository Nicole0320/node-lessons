var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/test');

db.connection.on('error', function(err){
    console.log('数据库链接失败：'+err)
})

db.connection.on('open', function(){
    console.log('数据库链接成功！')
})

var Cat = mongoose.model('Cat', {
    name: String,
    freinds: [String],
    age: Number
});

var kitty = new Cat({
    name: 'Rose',
    freinds: ['Tom', 'Sarah'],
    age: 2
})

kitty.save(function(err){
    if(err){
        console(err);
    }
    console.log('meow')
})

kitty = new Cat({
    name: 'Sarah',
    freinds: ['Rose', 'Jerry'],
    age: 3
})

kitty.save(function(err){
    if(err){
        console(err);
    }
    console.log('meow')
})