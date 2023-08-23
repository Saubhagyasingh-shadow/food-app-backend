const express = require("express");
const userModel = require("../.vscode/models/userModel");
const authRouter = express.Router("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../router/utility/nodemailer");

const { jwt_key } = require("../secrets");
//signup user

module.exports.signup = async function SignUp(req, res) {
  try {
    let dataobj = req.body;
    let user = await userModel.create(dataobj);
    sendMail("signup", user);
    if (user) {
      //console.log('backend',user);
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      //findone functions aur baaki aur sab object lete hain
      if (user) {
        //bcrypt-compare will be used later for increasing security
        if (user.password == data.password) {
          let uid = user["_id"]; //uid
          let token = jwt.sign({ payload: uid }, jwt_key); //iss line se hmara signature bn jaaye uid hum laak aa chuke hain aur header ya algoithm predefined hai
          // //cookie ka istemal krenge response bhejne se pehle response object k andar ek cookie bna denge
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        }
      } else {
        return res.json({
          message: "user not available",
        });
      }
    } else {
      return res.json({
        message: "empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//isAuthorised=>to check the user's role
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    //admin de rkha hai array mein agr aur ko yeh dena hai toh yeh role roles wali mein hona chahiye
    if (roles.includes(req.role) == true) {
      next();
      //getAlluser call ho jayega upar wale next se
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};
//protectroute
// function protectRoute(req,res,next){
//     if(req.cookies.islogIn){
//         next();
//         let isVerified=jwt.verify(req.cookies.login,jwt_key);
//         if(isVerified){
//             next();
//         }
//         else{
//             return res.json({
//                 message:'user not verified'
//             })
//         }
//     }
//     else{
//         return res.json({
//              message:'please log in,operation not allowed'
//         })
//     }
// }

//agar logged in hai usk lie
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      //token k andar humne userid ka use kia hai toh payload jo banega agr token shi hai usmein id hogi uss user ki joki payload k andar payload naam k object mein hogi usemin hum user ko doondhenge aur fir uss user ka role aur id request mein daal denge fir getuser chala lenge
      let payload = jwt.verify(token, jwt_key);
      //verify mein 1st token aayega jo ki hoga token aur doosra hoga secret key
      console.log("payload token", payload);
      console.log(req.cookies);

      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.role, req.id);
        next();
      } else {
        return res.json({
          message: "user not verified",
        });
      }
    } else {
      //browser
      const client = req.get("User_Agent"); //ismein aa jayega ki kaun use kar rha hai
      //agr browser se request aai hai toh login pe redirect krdo
      if (client.includes("Chrome") == true) {
        return res.redirect("/login");
      }
      //postman
      res.json({
        message: "please log in again",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//forget password
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      //createResetToken is the function we use which we can write ourseleves
      //this in userModel this method is added to userschema
      const resetToken = user.createResetToken();

      //humein kuch aisa chahiye
      //http: abc.com/resetpassword/resetToken
      //req.protocol=http  , host=name of our website
      http: var resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

      //send email to the user
      //done by nodemailer
      let obj = {
        resetPasswordLink: resetPasswordLink,
        email: email,
      };
      sendMail("resetpassword", obj);
      return res.json({
        mesaage: "password changed successfully",
      });
    } else {
      return res.json({
        message: "please signup",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({
      resetToken: token,
    });

    if (user) {
      //resetpasswordhandler will update user password in db
      //this resetPasswordHandler in userModel this method is added to userschema
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password changed successfully please login again",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.logout = function logout(req, res) {
  //agr hum login naam ki cookie ka jo alphanumeric code ki value hai use zero krde toh vo logout ho jayega
  //jwt token jo login  cookie ki value hai use uda denge  
  res.cookie("login", "", { maxAge: 1 });
  //maxage ki madd se hum puri cookie hi uda denge
  res.json({
    message: "user logged out successfully",
  });
};
