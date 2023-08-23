const express=require("express");
const app = express();
const userRouter=express.Router();
const multer =require('multer')
//const protectRoute=require('./authhelper');
const {
    getUser,getUserById,updateUser,deleteUser,postUser, getAllUser,updateProfileImage}=
    require('../controller/userController');
const { method } = require("lodash");

const{signup,login,isAuthorised,protectRoute,logout, forgetpassword, resetpassword}=require('../controller/authController');
//user options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)


userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)

// userRouter
// .route("/")
// .get(protectRoute,getAllUser);
//multer for file upload
//needs storage,and filter ki filter krk bhejein data
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images',)
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
})

const filter=function (req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("Not an image:Please uplaod an new image"),false);
    }
}

const upload=multer({
    storage:multerStorage,
    fileFilter:filter
});

userRouter.post("/ProfileImage",upload.single('photo'),updateProfileImage);
//get request
userRouter.get('/ProfileImage',(req,res)=>{
    try{

        res.sendFile("C:/Users/kavit/OneDrive/Desktop/New folder/multer.html")
    }catch(err){
        res.send(err)
    }
})

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)



//admin specific functions
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)





// .route('/')//these were before video 24
// .get(protectRoute,getUsers)
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser);
// userRouter
// .route("/getCookies")
// .get(getCookies);
// userRouter
// .route("/setCookies")
// .get(setCookies);
// userRouter.
// route('/:id').get(getUserById);


    module.exports=userRouter;

