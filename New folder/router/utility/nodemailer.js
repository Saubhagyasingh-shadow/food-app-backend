const nodemailer=require('nodemailer');

module.exports.sendMail=async function sendMail(str,data){
    let transporter =nodemailer.createTransport({
         host:"smtp.gmail.com",
         port:587,
         secure:false,//truth for 465,false for other ports
         auth:{
            user:'12113026@nitkkr.ac.in',//generated ethereal user
            pass:"bofusbllkjmvymdj",
         }
    });
    var Otext,Osubject,Ohtml;
    if(str=="signup"){
        Osubject=`thank you for signing ${data.name}`;
        Ohtml=`<h1>Welcome to foodappp.com</h1>
        hope you have a good time:
        Here are your details-
        Name-${data.name}
        Email-${data.email}`
    }
    else if(str=="resetpassword"){
        Osubject=`reset password`;
        Ohtml=`<h1>foodapp.com</h
        here is your link to reset your password:
        ${data.resetPasswordLink}`
    }
  let info= await transporter.sendMail({
    from:'"foodapp "<12113026@nitkkr.ac.in>',//senders address
    to:data.email,//list of recievers
    subject:Osubject,//Subject Line
    //plain text body
    html:Ohtml,//html body
  });
  console.log("Message sent: %s",info.messageId);
}