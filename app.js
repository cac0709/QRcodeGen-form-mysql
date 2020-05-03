var express = require('express');
var bodyParser = require('body-parser');
var QRcode = require('qrcode');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'nodejs_login'
    });
    // 建立連線後不論是否成功都會呼叫
    conn.connect(function(err){
    if(err) throw err;
    console.log('connect success!');
    });
    // 其他的資料庫操作，位置預留
    // 關閉連線時呼叫
    conn.end(function(err){
    if(err) throw err;
    console.log('connect end');
    })

    //路竟
    app.use(express.static(path.join(__dirname, '/js')));

    //init app
    var app = express();
    
    //set 模板
    app.set('view engine','ejs');

    //fetch data from the request
    app.use(bodyParser.urlencoded({extended:false}));

    //default page load
    app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
        res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
            if (err) res.send(404);});
        });



    //route
    app.get('/',function(req,res){
        res.render('home');
    });

    
        
    
    
    
   
    app.listen(port);
    console.log("已啟動在http://localhost:8080/");