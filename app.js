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
        var sql = 'select * from reservation '//取qrcode網址
        var sql2 = 'select * from reservation where starttime = CURRENT_TIME()'//取會議名稱
        var sqlmonday = "SELECT * FROM nodejs_login.reservation where opendate = subdate(curdate(),date_format(curdate(),'%w')-1) order by starttime asc;"
        var sqltwosday = "SELECT * FROM nodejs_login.reservation where opendate = subdate(curdate(),date_format(curdate(),'%w')-2) order by starttime asc ;"
        var sqlthird = "SELECT * FROM nodejs_login.reservation where opendate = subdate(curdate(),date_format(curdate(),'%w')-3) order by starttime asc;"
        var sqlforthday = "SELECT * FROM nodejs_login.reservation where opendate = subdate(curdate(),date_format(curdate(),'%w')-4) order by starttime asc;"
        var sqlfriday = "SELECT * FROM nodejs_login.reservation where opendate = subdate(curdate(),date_format(curdate(),'%w')-5) order by starttime asc;"
        var sqlfortest = 'Select * from reservation where dayofweek(opendate)=4;'
       

        conn.query(sql2,function(err,result2){
            console.log(result2)
            meetingname = result2;
     
        conn.query(sql,function(err,result){
            console.log(result);
            //給資料庫撈出來的資料定義
            test = result;

            conn.query(sqlmonday,function(err,resultmon){
                console.log("星期一"+resultmon)
                meetingnamemonday = resultmon;
        
                conn.query(sqltwosday,function(err,resulttwo){
                    console.log("星期二"+resulttwo)
                    meetingnametwo = resulttwo;

                    conn.query(sqlthird,function(err,resultthird){
                        console.log("星期三"+resultthird)
                        meetingnamethird = resultthird;

                        conn.query(sqlforthday,function(err,resultfour){
                            console.log("星期四"+resultfour)
                            meetingnamefour = resultfour;

                            conn.query(sqlfriday,function(err,resultfri){
                                console.log("星期五"+resultfri)
                                meetingnamefri = resultfri;
                
            
        
    
        
        
        //demo
        conn.query(sqlfortest,function(err,resulttest){
                    console.log(resulttest);
                    realtest = resulttest;

        const fs = require('fs');
        const qrcode = require('qrcode');
        run().catch(error => console.error(error.stack));

        async function run() {
          const res = await qrcode.toDataURL("sign in"+test)
        
          fs.writeFileSync('./views/test3.ejs', `<!DOCTYPE HTML>
       
          <html>
              <head>
                  <title>一號會議室</title>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="stylesheet" href="/css/test3.css" />
              </head>
              <body onload="showTime()">
          
                  <!-- Header -->
                      <header id="header">
                       
                          <div class="logo"><a href="#"><%= meetingname.meetingname %></a></div>
                          <h2>現在時間</h2>
                          <div id ="time"></div>
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
          
                      
                      </header>
                      <div id="sc">
                      <table BORDER="1" align=center style="width:1500px;height:1000px;color:black;font-size:40px;font-family:DFKai-sb;">

                      <tr>
                          <td>時間/星期</td>
                          <td>星期一</td>
                          <td>星期二</td>
                          <td>星期三</td>
                          <td>星期四</td>
                          <td>星期五</td>
                      </tr>
                      <tr>
                          <td>7:00-8:00</td>
                          <td><%=meetingnamemonday[0].meetingname %></td>
                          <td><%=meetingnametwo[0] %>  </td>
                          <td><%=meetingnamethird[0].meetingname %>  </td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td>8:00-9:00</td>
                          <td><%=meetingnamemonday[1] %></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td>9:00-10:00</td>
                          <td><%= meetingnamemonday[2]%></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td>10:00-11:00</td>
                          <td><%= meetingnamemonday[3]%> </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td>11:00-12:00</td>
                          <td><%= meetingnamemonday[4]%></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td>13:00-14:00</td>
                          <td><%= meetingnamemonday[5]%></td>
                          <td></td>
                          <td><%= realtest[0].meetingname%></td>
                          <td></td>
                          <td></td>
                      </tr>
                          <td>14:00-15:00</td>
                          <td><%= meetingnamemonday[6]%></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                      <td>15:00-16:00</td>
                      <td><%= meetingnamemonday[7]%></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                     <tr>
                          <td>17:00-18:00</td>
                          <td><%= meetingnamemonday[8]%></td>
                          <td>  </td>
                          <td>  </td>
                          <td></td>
                          <td></td>
                      </tr>
                      </table>
                    </div>
                      
               
          
                  <!-- Scripts -->
                      <script src="/js/jquery.min.js"></script>
                      <script src="/js/jquery.poptrox.min.js"></script>
                      <script src="/js/skel.min.js"></script>
                      <script src="/js/util.js"></script>
                      <script src="/js/main.js"></script>
                      <script>function showTime(){
                          var today =new Date();
                          var h = today.getHours();
                          var m = today.getMinutes();
                          var s = today.getSeconds();
                          document.getElementById('time').innerHTML = h+":"+m+":"+s;
                          setTimeout(function(){showTime()},500);

                          
                      }</script>
          
              </body>
          </html>`);
          console.log('Wrote to ./views/test3.ejs');
          
          
        }
        res.render('test3',{meetingname:meetingname,meetingnamemonday:meetingnamemonday,meetingnametwo:meetingnametwo,meetingnamethird:meetingnamethird,meetingnamefour:meetingnamefour,meetingnamefri:meetingnamefri,realtest:realtest});
    })  
})       
})
})
})
})
})
})
})
      
    

    
        
    
    
    
   
    app.listen(port);
    console.log("已啟動在http://localhost:8080/");
