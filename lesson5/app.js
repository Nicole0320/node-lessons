var async = require('async');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err, res){
    if(err){
        return console.error(err);
    }
    var topicUrls = [];
    getUrlsFromHtml(topicUrls, res.text)
    async.mapLimit(topicUrls, 5, function(url, callback){
        getInfoFromEachUrl(url, callback)
    }, function(err, result){
        console.log(result);
    })
})

//将获取到的HTML内容中的文章链接都解析出来
function getUrlsFromHtml(Urls, html){
    var $ = cheerio.load(html);
    $('#topic_list .topic_title').each(function(index, value){
        var $element = $(value);
        //利用 url.resolve 为获取到的只有相对路径的链接添加协议和域名
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        Urls.push(href);
    })
}

//对URL数组中的单个URL处理，获得该URL打开的文章标题和第一条评论
function getInfoFromEachUrl(topicUrl, callback){
    superagent.get(topicUrl).end(function(err, res){
        if(err){
            console.log(err);
        }
        var $ = cheerio.load(res.text);
        var jsonObj = {
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment: $('.reply_content').eq(0).text().trim()
        }
        callback(null, jsonObj);
    })
}