const nodemailer = require ('nodemailer ') 

 const transporter= nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, //puerto que se va a comunicar con el servidor
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL, // se coloca en una variable de entorno
    pass: process.env.EMAIL_PASSWORD,
  },
})

module.exports = transporter




