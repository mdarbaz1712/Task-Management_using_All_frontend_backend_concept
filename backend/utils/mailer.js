const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail", // you can use outlook, yahoo, or custom SMTP
    auth:{
        user:process.env.EMAIL_USER,  // your email
        pass:process.env.EMAIL_PASS   // your email password / app password
    }
});

const sendMail=(to,subject,text)=>{
    return transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text
    });
}

module.exports=sendMail;
