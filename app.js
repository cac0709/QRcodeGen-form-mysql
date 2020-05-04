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
        var conn = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '123456',
            database : 'nodejs_login'
            });
        var sql = 'select * from users '
        conn.query(sql,function(err,result){
            console.log(result);
            //給資料庫撈出來的資料定義
            test = result[0].password;
       

        const fs = require('fs');
        const qrcode = require('qrcode');
        run().catch(error => console.error(error.stack));

        async function run() {
          const res = await qrcode.toDataURL("http://localhost:8080/"+test)
        
          fs.writeFileSync('./views/test3.ejs', `<!DOCTYPE HTML>
          <!--
              Caminar by TEMPLATED
              templated.co @templatedco
              Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
          -->
          <html>
              <head>
                  <title>一號會議室</title>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="stylesheet" href="/css/test3.css" />
              </head>
              <body>
          
                  <!-- Header -->
                      <header id="header">
                          <div class="logo"><a href="#">我雞雞超大 <span>現在進行的會議</span></a></div>
                      </header>
          
                  <!-- Main -->
                      <section id="main">
                          <div class="inner">
          
                          <!-- One -->
                              <section id="one" class="wrapper style1">
          
                                  <div class="image fit flush">
                                      <img src="${res}">
                                  </div>
                                  
                                  <div class="content">
                                      
                                  </div>
                              </section>
          
                          
                          </div>
                      </footer>
          
                  <!-- Scripts -->
                      <script src="/js/jquery.min.js"></script>
                      <script src="/js/jquery.poptrox.min.js"></script>
                      <script src="/js/skel.min.js"></script>
                      <script src="/js/util.js"></script>
                      <script src="/js/main.js"></script>
          
              </body>
          </html>`);
          console.log('Wrote to ./views/test3.ejs');
        }
    })  
    res.render('test3');    
})
      
    

    
        
    
    
    
   
    app.listen(port);
    console.log("已啟動在http://localhost:8080/");
