const { text_18, text_16 } = require("./translations");

exports.send = function send_mail(mail, lang, num, last_name){
    console.log("start")
    try {
     
    var nodemailer = require("nodemailer");
        let smtpTransport = nodemailer.createTransport({
            host: process.env.mail_server,
            port: 587,
            auth: {
              user: process.env.mail_from,
              pass: process.env.mail_pass,
            },
          });
    if(num == 16){
        var mailOptions = {
            from: process.env.mail_from_name, // Sender address
            to: mail, // List of recipients
            subject: text_16[0][lang][13].text,
            text: `${text_16[0][lang][14].text+ " " +last_name} \n 
                    ${text_16[0][lang][15].text}\n
                    ${text_16[0][lang][16].text}\n
                    ${text_16[0][lang][17].text}
                    ${text_16[0][lang][18].text}\n`
          };
    }else{
        var mailOptions = {
            from: process.env.mail_from_name, // Sender address
            to: mail, // List of recipients
            subject: text_18[0][lang][13].text,
            text: `${text_18[0][lang][14].text+" " +last_name} \n 
                    ${text_18[0][lang][15].text}\n
                    ${text_18[0][lang][16].text}\n
                    ${text_18[0][lang][17].text}
                    ${text_18[0][lang][18].text}\n`
          };
    }
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if(error) console.log(error);
            if(!error) console.log("sent");

          })
              
       
} catch (error) {
      console.log(error)  
}
}