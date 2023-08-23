//*******hum jo bhi data bhejte hain frontend se back end main vo request ki body k andar pra hot hai *//////
const express=require("express");
const app =express();
const userModel=require('./models/userModel')
const cookieParser=require('cookie-parser');
//yeh ek middleware post k data ko json main bdlne k lie use hota hai
app.use(express.json());

app.listen(3000);
app.use(cookieParser());
// let users={};
/*let users=[{
    id:1,
    name:"abhiskek"
},
{
    id:2,name:"jasbir"
},{
    id:3,
    name:"kartik"
},
];*/

//mini app
//----user k lie mini app bnaana chahe hain,ek router bnayenge users k lie
const userRouter=express.Router();
const authRouter=express.Router();

app.use('/users',userRouter);
app.use('/auth',authRouter);
//---AB HUMNE JAAN lia ki base route iska hia /user aur / k baad kuch nhi hai toh sirf ek slash
userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route("/getCookies")
.get(getCookies);

userRouter
.route("/setCookies")
.get(setCookies);


userRouter.
route('/:id').get(getUserById);

authRouter
.route('/signup')
.get(middleware,getSignUp)
.post(postSignUp);

function middleware(req,res,next){
    console.log("this is middleware");
    next();
}

// //***get data */
// app.get('/users',(req,res)=>{
//     res.send(users);
// })
// //frontend bhej rha hai humarein backend main data
// //frontend jo hota hai jo bhi request aati hai request jo aati hai usmein data hota hai

// //ab maine frontend se backend ki trf ek request bheji hai aur
// //uss body k andar maine kuch data bhi bheja hai ab voh backend main aayeg a
// // maine first line main jo dat aaya hai use print kraya hai 
// //aur response main   hej dia hai ki data successfully mil gya hai aur yeh hai vo data

// //**post data */
// app.post('/users',(req,res)=>{
// console.log(req.body);
// //niche wali line se humne appne users main request ki body daaldi hai
// users=req.body;
// res.json({
//     message:"data recieved succcessfuly",
//     users:req.body
// });
// })

// //updata-> PATCH request milega ki humari yeh cheez update kar do ya kuch add kar do
// //request main data milega
// app.patch('/users',(req,res)=>{
//     console.log('req.body->',req.body);
//     //update data in users object
//     let dataToBeUpdated=req.body;
//     for(key in dataToBeUpdated){
//         users[key]=dataToBeUpdated[key];
//     }
//     res.json({
//         message:"data updated successfully"
//     })
// })

// //to delete a data
// app.delete('/users',(req,res)=>{
// users={};
// res.json({
//     message:"data has been deleted"
// });
// });
// //********params*****/// 
// //sare users nhi uss particular id k bas

// // app.get('/users/:id',(req,res)=>{
     
// //     console.log(req.params.id);
// //     res.send("user id recieved");
// // })
// app.get('/users/:username',(req,res)=>{
//      //username a property in params
//     console.log(req.params.username);
//     console.log(req.params);
//     res.send("user id recieved");
// })

// ///**QUERIES *////
// app.get('/users',(req,res)=>{
//     console.log(req.query);
//     res.send(users);
// })

async function getUsers(req,res){
let allUsers=await userModel.findOne({name:'saubhagya'});
res.json({

    message:'list of all users',
    data:allUsers}
);
}


function getUser(req,res){
    res.send(users);
}
function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data recieved successfully",
        users:req.body
    });
}


//this is was functioon brfore mongodb
// function updateUser(req,res){
// console.log('req.body->',req.body);
// //update data in users obj
// let dataToBeUpdated=req.body;
// for(key in dataToBeUpdated){
//     users[key]=dataToBeUpdated[key]
// }
// res.json({
//     message:"data updated sucessfully"
// })}

/*function deleteUser(req,res){
    users={};
    req.json({
        message:"data has been deleted"
    })
}*/

function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req recieved",
        data:obj
    });
}

function getSignUp(req,res){
    console.log("getsignup called");
    res.sendFile('/signupform.html',{root:__dirname});
}
//humne form bnaya hum chahte hain ki signup par data frontend se backend main aa jaaye
//toh usk lie humne post request kri toh sara data aa jayega humara browser frontend se request marega humare backend k serverko
//uss request ki body main hi data hoga 
//har request k liye response hona compulsory hai

/*function postSignUp(req,res){
    let obj=req.body;
    console.log('backend',obj);
    res.json({
        message:"user signed up",
        data:obj
    });
}*/

// ab yeh niche vala postsignup post hai mongodb wala
async function postSignUp(req,res){
    let dataobj=req.body;
    let user =await userModel.create(dataobj);
    //console.log('backend',user);
    res.json({
        message:"user signed up",
        data:user
    });
}

async function updateUser(req,res){
    console.log('req.body->',req.body);
    //update data in users obj
    let dataToBeUpdated=req.body;
    let users=await userModel.findOneAndUpdate({email: "abcde@gmail.com"},dataToBeUpdated);
    res.json({
        message:"data updated sucessfully"
    });}

async function deleteUser(req,res){
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
}

function setCookies(req,res){
    
    //res.setHeader('Set-Cookie','isLoggedIn=true');
    //very long above syntax so we are going to use cookieParser
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true ,httpOnly:true});
    //secure:true  kie toh load nhi hoga pge kyuki vo site tabhi accessible hogi jab humaari site  vo https connection vali honi chahiye 
    //httpOnl:true  hoga toh cookie sirf accesible hogi backend pe jo bhi transfer hoga vooh http ka server pe hoga ab hum cookies ko frontend se access nhi kar skta 
    //can change true and false
    res.cookie('isPrimeMember',true);
 //this is accessible from fontend as httpOnly not true here
    res.send('cookies has been set');
}

function getCookies(req,res){ 
let cookies=req.cookies;
console.log(cookies+"hello");
res.send('cookies recieved');
}
