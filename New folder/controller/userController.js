const userModel=require('../.vscode/models/userModel')

// module.exports.getByid=function getByid(req,res){
//     // console.log(req.params.id);
//     // let paramId=req.params.id;
//     // let obj={};
//     // for(let i=0;i<users.length;i++){
//     //     if(users[i]['id']==paramId){
//     //         obj=users[i];
//     //     }
//     // }
//     // res.json({
//     //     message:"req recieved",
//     //     data:obj
//     // });
// };

module.exports.updateUser=async function updateUser(req,res){
    // console.log('req.body->',req.body);
    //update data in users obj
    try{
    let id=req.params.id;
    let user=await userModel.findById(id);
    let dataToBeUpdated=req.body;
if(user){
    const keys=[];
    //asli mein jab voh update dabayega toh hon skta hai k vo 
    //chahe ki 2 cheezein bdlna toh datatobeupdated ek object hoga uski har ek value jo change honi hogi unhein keys mein daal do
    for(let key in dataToBeUpdated){
        keys.push(key);
    }
    for(let i=0;i<keys.length;i++){
        user[keys[i]]=dataToBeUpdated[keys[i]];   
    }
    //document level pe kaam karta hai iss particular ko save karta hai
  const updatedData=await user.save();
  res.json({
        message:"data updated sucessfully",
        data:user
    });
}else{
     res.json({
        message:'user not found'
     })

}}
catch(err){
    res.json({
        message:err.message
    })
}
    }

module.exports.deleteUser=async function deleteUser(req,res){
   // let dataToBeDeleted=req.body;
   try{
   let id=req.params.id;
    let user=await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({
            message:'user not found'
        });
    }
    res.json({
        message:"data has been deleted",
        data:user
    });}
    catch(err){
        res.json({
            meassge:err.message
        });
    }
}

module.exports.getAllUser=async function getAllUser(req,res){
    let allUsers=await userModel.find();
    if(allUsers){
        res.json({
        message:' users retrieved',
        data:allUsers}
    );

    }
    else{
         //let allUsers=await userModel.findOne({name:'saubhagya'});
    res.send("user id recieved")
    }
   
    }
    
    
 module.exports.getUser= async function getUser(req,res){
    let id=req.id;
    let user =await userModel.findById(id);
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            message:'user not found'
        })
    }
    }

//  module.exports.postUser=function postUser(req,res){
//         console.log(req.body);
//         users=req.body;
//         res.json({
//             message:"data recieved successfully",
//             users:req.body
//         });
//     }



    // function setCookies(req,res){
    //     //res.setHeader('Set-Cookie','isLoggedIn=true');
    //     //very long above syntax so we are going to use cookieParser
    //     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true ,httpOnly:true});
    //     //secure:true  kie toh load nhi hoga pge kyuki vo site tabhi accessible hogi jo humaari jo site hogi na vo https connection vali hogi 
    //     //httpOnl:true  hoga toh cookie sirf accesible hogi backend pe jo bhi transfer hoga vooh http ka server pe hoga ab hum cookies ko frontend se access nhi kar skta 
    //     //can change true and false
    //     res.cookie('isPrimeMember',true);
    //  //this is accessible from fontend as httpOnly not true here
    //     res.send('cookies has been set');
    // }
    
    // function getCookies(req,res){
    // let cookies=req.cookies.isLoggedIn;
    // console.log(cookies);
    // res.send('cookies recieved');
    // }
module.exports.updateProfileImage=function updateProfileImage(req,res){
     res.json({
        message:"file uploaded successfully"
    });
}