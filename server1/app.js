const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const { json } = require("express");

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("login");   
})
app.get('/register',function(req,res){
    res.render("register")
})

app.get('/shorturl',function(req,res){
    
    request("http://127.0.0.1:8001/data",function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
             
            res.render("shorturl",{shortUrls:data["shortUrls"]})
        }
    });
});
app.get('/:shortUrl', function (req,res){
    const shortUrl = req.params.shortUrl;

    request("http://127.0.0.1:8001/data/".concat(shortUrl),function(error,response,body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }
    })
    
    // const shortUrl = await  shorturl.findOne({short:req.params.shortUrl})
    // if (shortUrl == null) return res.sendStatus(404)
    // // shortUrl.clicks++
    // // shortUrl.save()
    // res.redirect(shortUrl.full)
});



app.listen(8000,function(){
    console.log("HEllo World 1");
});