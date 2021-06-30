const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req,res)=>{
    res.render('index');
})

app.post('/' , (req , res)=>{
   const from =  req.body.from
   const pass =  req.body.pass
   const to =  req.body.to
   const text =  req.body.message
   const subject = req.body.subject

 let transporter =  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth:{
        user: from,
        pass: pass
    }
});

let mailOptions = {
    from : from,
    to: to,
    subject: subject,
    text: text    
}
transporter.sendMail(mailOptions, (err, data) =>{
    if(err){
        console.log(err)
        res.send(`<h3>Quyidagi<a href="https://myaccount.google.com/lesssecureapps"> link </a>orqali emailingizdan xabar yuborish imkoniyatini tasdiqlang.</h3>`)
    }else{
        console.log('succesfully send', data);
         res.redirect('/');
    }
})

})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port`);
});