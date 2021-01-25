var express=require('express')
// const request = require('superagent')
var cheerio=require('cheerio')
// var charset = require("superagent-charset");
const request = require('superagent')
require('superagent-charset')(request)

var app=express();
app.get('/',function(req,res,next){
    request.get('https://dl.58pic.com/36350272.html').charset('gbk').set({
        "Cache-control": "private",
        "Connection": `keep-alive`,
        "Content-Encoding": `gzip`,
        "Content-Type": `text/html; charset=gbk`,
        "Date": `Mon, 25 Jan 2021 12:07:52 GMT`,
        "Keep-Alive": `timeout=20`,
        "Server": `nginx`,
        "Set-Cookie": `1490c6811c510539f99068d1b8b4e2ba=%22182.48.111.91%22; expires=Mon, 25-Jan-2021 12:08:02 GMT; Max-Age=10; path=/; domain=58pic.com`,
        "Set-Cookie": `qt_uid=%2257697130%22; expires=Wed, 01-Jan-2121 12:07:52 GMT; Max-Age=3153600000; path=/; domain=58pic.com`,
        "Set-Cookie": `qt_type=2; expires=Wed, 01-Jan-2121 12:07:52 GMT; Max-Age=3153600000; path=/; domain=58pic.com`,
        "Set-Cookie": `qt_utime=1611576472; expires=Wed, 01-Jan-2121 12:07:52 GMT; Max-Age=3153600000; path=/; domain=58pic.com`,
        "Set-Cookie": `searchParam=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/; domain=58pic.com`,
        "Set-Cookie": `last_dl_limit=2; expires=Mon, 25-Jan-2021 12:37:52 GMT; Max-Age=1800; path=/; domain=58pic.com`,
        "Transfer-Encoding": `chunked`
    }).end(function(err,element){
        // let cookies="12345"
        if(err){
            return next(err)
        }
        var $=cheerio.load(element.text);
        // var arr=element.text.match(/<meta([^>]*?)>/g);
        // var charset="utf-8"
        // if (arr) {
        //     arr.forEach(function (val) {
        //         var match = val.match(/charset\s*=\s*(.+)\"/);
        //         if (match && match[1]) {
        //             if (match[1].substr(0, 1) == '"')match[1] = match[1].substr(1);
        //             charset = match[1].trim();
        //         }
        //     })
        // }
        // console.log(element.text);
        // let h=$('.detailBtn-down').trigger("click")
        // $('.limit-top-title').each(function(index, item) {
        //     console.log($(item).html());
        // })
        // var items=[]
        // $('.downlist li').each(function(index,item) {
        //     var $item=$(item);
        //     items.push({
        //         title:$item.find('a').html(),
        //         href:$item.find('a').attr('href')
        //     });
        // })
        res.send(element.text)
        // console.log(items);
    })
})
app.listen(3000,function() {
    console.log('success');
})