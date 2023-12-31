const { error } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const dotenv = require("dotenv");
require('dotenv').config();

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine','ejs'); 

app.use(express.static('public'));
const port = process.env.PORT;
app.get('/result',(req,res)=>{
    let query = req.query.search;
    request('https://api.themoviedb.org/3/search/movie?api_key=d111c8de01b6a7d6061e13c31e1e4d6e&query='+query,(error,response,body)=>{
        if(error){
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('movies' , {data:data , searchQuery:query});
        
    });
    
});
app.get('/',(req,res)=>{
    res.render('search');

});
app.get('/search',(req,res)=>{
    res.render('search');

});

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});