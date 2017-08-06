var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res){
    //用superagent抓取目标网站的内容
    superagent.get('https://www.zhihu.com/topic/19550901/top-answers')
        .end(function(err, sres){
            //superagent错误处理
            if(err){
                return next(err);
            }
            //sres.text 里存储着网页的html内容，将它传给 cheerio.load，就可得到一个实现了类似 jQuery 的接口变量
            var $ = cheerio.load(sres.text);
            var items = [];
            var html = '<ul>'
            $('.zm-topic-list-container .feed-main .content').each(function(index, value){
                var $element = $(value);
                items.unshift({
                    title: $element.children('h2').text(),
                    href: 'https://www.zhihu.com' + $element.find('.entry-body link').eq(0).attr('href'),
                    author: $element.find('.js-collapse-body').eq(0).attr('data-author-name')
                });
                if(items[0].title === ''){
                    items.shift();
                    return;
                }
                html += `<li><a href=${items[0].href}>${items[0].title}</a>--作者：${items[0].author}</li>`
            });
            html += '</ul>'

            console.log(items);
            res.send(html);
        })
})

app.listen(3000, function(){
    console.log('app is running at port 3000')
})