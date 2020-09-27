const express = require("express");
const app = express();
const mongoose = require('mongoose');
const shorturl = require('./models/shortUrl');
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

mongoose.connect("mongodb://localhost/authandurl",{
    useNewUrlParser:true, useUnifiedTopology:true,
});


app.post("/register",function(req,res){
    res.send("Register Route")
});
app.post("/login",function(req,res){
    res.send("login Route")
});

app.post("/shorturl",async function(req,res){
    await shorturl.create({
        full: req.body.fullurl
    })
    res.redirect('http://127.0.0.1:8000/shorturl')
})

app.get("/data",async function(req,res){
    const shortUrls = await shorturl.find();
    res.send({shortUrls:shortUrls})
})

app.get("/data/:shortUrl",async function (req,res){
    const shortUrl = await  shorturl.findOne({short:req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
     res.send(shortUrl)
})

app.listen(8001,function(){
    console.log("HEllo World 2");
});