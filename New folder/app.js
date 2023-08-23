const express=require('express');

const app=express();
app.listen(3000);

//ismein get request main pehlaa parameter hai kis route pe data hai aur doosra callback function
//path,callback function
app.get('/',(req,res)=>{
    res.send('hello wvod')
});
//send main humein header set krne ki jrurat nhi hai aur kuch status codes yeh khud hi handle kar leta hai 
//***to send whole html file */
app.get('/about',(req,res)=>{
    res.sendFile('C:/Users/kavit/OneDrive/Desktop/New folder/public/about.html');
})

//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

//404 page for this we can use a middleware called use function 
//jo bhi request vo top to bottom chleg aagr kuch nhi milega toh use chala dega 
//isliye humein use ko sabse neeche rkhna chahiye 
app.use((req,res)=>{
    res.status(404).sendFile('./public/404.html',{root:__dirname});
})

//POST REQUEST=>to send data from frontend to backend
 