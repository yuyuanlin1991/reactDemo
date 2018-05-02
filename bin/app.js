var express = require('express');
var path = require("path");
var ejs=require('ejs')//用于模板引擎

var app = express();

//定义一个模板引擎
app.engine('html',ejs.__express);
//设置引擎的模板初始路径
app.set('views',path.join(__dirname,'views'));
//作用：设置html模板的路径为views，下面代码在使用引擎返回页面时，只需写相对views的路径即可
//设置对应模板引擎
app.set('views engine','html');


//get方式提交时，渲染页面
app.get('/',function(req,res){
    //使用res.render方式发送页面
    res.render('index.html')
    //在这里不需要再写html相对当前文件的路径，而是直接通过views目录来找到index.html文件
})

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});