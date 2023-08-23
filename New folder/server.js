//server creation 

//for making we need http modules
 
const fs = require('fs');//doosri files ko read krne k lie 
const http=require('http');
const _ =require('lodash');
//server bnane k lie yeh niche wala function chlega hi
//yeh ek request ,response object lega 
const server=http.createServer((req,res)=>{
  console.log("requuest has been made from browaer to server");
// console.log(req.method);
// console.log(req.url);

///*****response object */
//setHeader se set kie ki kaunse type ka data hain
//write se data bheja hai 
res.setHeader('Content-Type','text/html');
// res.write('<h1>hello,pepcoders</h1>');
// res.end(); 

let path='.';
switch(req.url){
    case '/':
    path+='/index.html'
    res.statusCode=200;
    break;
    case '/about':
    path+='/about.html'
    res.statusCode=200;
    break;
    case '/about-abc':
        res.statusCode=301;
        res.setHeader('location','/about');

        break;
    default:
        path+='/404.html'
        res.statusCode=404;
        break; 
};


fs.readFile(path,(err,fileData)=>{
    if(err){
        console.log(err);
    }
    else{
        res.write(fileData);
        res.end(fileData);
    }
});

});
//req mein sara data hota hai request k baare mein 
//ab kaan bnate hai listen k lie
 //koi request maare toh sunte rho suno iss port pe
//port number,host , callback function 
server.listen(3000,'localhost',()=>{
console.log("server is listening at port number 3000");
});
//console humaare browser mein nhi ho rha kyunki humne jo ip lagaya hai vo humare computer ka hi hai toh ismein hi dikh ja rha hai 
