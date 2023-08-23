const express = require("express");
const userModel = require("../.vscode/models/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");
const { jwt_key } = require("../secrets");

authRouter.route("/signup").post(postSignUp); 
//ISKO HATA DIYA PURA AUTH/LOGIN KO KYUNKI ISKA POST USERS MEIN HANDLE HAI AUR ISKA GET HUM FRONT END SE KAR LENGE
// authRouter.route("/login").post(loginUser);

function middleware(req, res, next) {
  console.log("this is middleware");
  next();
}
// function getSignUp(req, res) {
//   console.log("getsignup called");
//   res.sendFile("/signupform.html", { root: __dirname });
// }

// ab yeh niche vala postsignup post hai mongodb wala
async function postSignUp(req, res) {
  let dataobj = req.body;
  let user = await userModel.create(dataobj);
  //console.log('backend',user);
  res.json({
    message: "user signed up",
    data: user,
  });
}
////////////////////LOGINUSER AUTH WLA JAB CONFUSION THI KI YEH AUTH MEIN JAYEGA KI USERS MEIN 
// async function loginUser(req, res) {
//   try {
//     let data = req.body;
//     //khali data aa rha hai toh uske liye yeh chahiye
//     if (data.email) {
//       let user = await userModel.findOne({ email: data.email });
//       //findone functions aur baaki aur sab object lete hain
//       if (user) {
//         //bcrypt->compare function will be used later for increasing security
//         if (user.password == data.password) {
//           let uid = user["_id"]; //uid
//           let token = jwt.sign({ payload: uid }, jwt_key); //iss line se hmara signature bn jaaye uid hum laak aa chuke hain aur header ya algoithm predefined hai
//           // //cookie ka istemal krenge response bhejne se pehle response object k andar ek cookie bna denge
//           res.cookie("login", token, { httpOnly: true });
//           return res.json({
//             message: "User has logged in",
//             userDetails: data,
//           });
//         }
//       } else {
//         return res.json({
//           message: "user not available",
//         });
//       }
//     } else {
//       return res.json({
//         message: "empty field found",
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }
module.exports = authRouter;
