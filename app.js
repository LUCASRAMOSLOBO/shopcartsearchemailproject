const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set('view engine', 'ejs');

app.listen(port,() =>{
    console.log('servidor rodando')
});

app.get('/home', (req, res)=>{
    res.render('home')
})
app.get('/homeenviado', (req, res)=>{
    res.render('home2')
})
app.post('/enviar', (req, res)=>{
    
    res.send(enviar(req),  res.redirect('/homeenviado'))
   
})

const enviar =  (req) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "",
            pass: ""
        }
    });
    
    const mailOptions = {
        from: 'Lucas , <>',
        //Lista de emails que você quer enviar (pode cadastrar vários, basta separar por " , ")
        to: 'lucas83869@gmail.com', 
        //Assunto do email
        subject: 'Teste de email com Nodejs ',
        //Aqui você pode enviar toda a mensagem
        text: 'Enviando email com nodejs + nodemailer ',
        // podemos também utilizar um HTML
        html: req.body.conteudo
    };
    
    // Enviando email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log('Mensagem enviada: ' + info.response);
    });
    const transporter2 = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "",
            pass: ""
        }
    });
    
    const mailOptions2 = {
        from: 'Lucas , <>',
        //Lista de emails que você quer enviar (pode cadastrar vários, basta separar por " , ")
        to: req.body.email, 
        //Assunto do email
        subject: 'Teste de email com Nodejs ',
        //Aqui você pode enviar toda a mensagem
        text: 'Enviando email com nodejs + nodemailer ',
        // podemos também utilizar um HTML
        html: req.body.conteudo
    };
    
    // Enviando email
    transporter2.sendMail(mailOptions2, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log('Mensagem enviada: ' + info.response);
    });
    
}
