var http=require('https');
var pageUrl='https://www.2animx.com/'
var cheerio=require('cheerio')
http.get(pageUrl,function(res){
    var html=''
    res.on('data',function(data){
        html+=data;
    })
    res.on('end',function(){
        callback(html)
    })
})
function callback(html){
    var $=cheerio.load(html)
    var arrUrl=[]

    $('.bleft-b li').each(function(index,element){
        // console.log(element.attr('href'));
        var detailsUrl=$(element).find('a').attr('href');
        var imgUrl=$(element).find('img').attr('src');
        var title=$(element).find('p').html();
        const obj = {
            detailsUrl,
            imgUrl,
            title
        };
        arrUrl.push(obj);
        
    })
    // console.log(arrUrl);
    getContent(arrUrl);
    
}
function getContent(arrUrl) {
    var count=0;
    var results = [];
    function done() {
        if(count==arrUrl.length){
            console.log('done');
        }
    }
    console.log(arrUrl);
    arrUrl.forEach(function(item, index) {
        http.get(item, function(res) {
            var html = '';
            res.on('data', function(data) {
                html += data;
            });
            res.on('end', function() {
                var $ = cheerio.load(html);
                var title = $('.entry-title').text();
                results[index] = {
                    url: item,
                    title: title
                };
                count++;
                done();
            }); 
        });
    });
}