var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url'); //来自Node.js标准库

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end(function(err, res){
        if(err){
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function(index, value){
            var $element = $(value);
            //利用 url.resolve 为获取到的只有相对路径的链接添加协议和域名
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        })

        var ep = new eventproxy();

        //重复监听对数组中每一个链接的处理事件
        ep.after('topic_html', topicUrls.length, function(topics){
            //监听到所有事件完成时的处理函数
            topics = topics.map(function(topicPair){
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment: $('.reply_content').eq(0).text().trim()
                })
            })
            console.log('final result:');
            console.log(topics);
        })

        topicUrls.forEach(function(topicUrl){
            //对每个topicUrl的处理事件
            superagent.get(topicUrl).end(function(err, res){
                console.log('fetch ' + topicUrl + ' successfully');
                ep.emit('topic_html', [topicUrl, res.text]);
                console.log(res.text);
            })
        })
    })