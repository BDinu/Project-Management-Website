const express = require("express");
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const session = require('express-session');
const mysql = require("mysql");
const app=express(); //Sa fim siguri ca porneste serveru
const path = require('path');
dotenv.config({path:'./.env'});
const bd = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
})

const publicDirectory = path.join(__dirname, '././public');
app.use(express.static(publicDirectory));
console.log(__dirname)



app.set('view engine','ejs');
//Verificam daca s-a connectat baza de date
bd.connect((error)=>{
    if(error){
        console.log(error)
    }
    else {
        console.log("Database connected!")
    }

})

//Facem rutele
//Luam datele din formuri
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
    secret: 'secret_key', // Cheia secretă pentru semnarea cookie-urilor de sesiune
    resave: false,
    saveUninitialized: true
}));



app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));


//Verificam daca a pornit serverul
app.listen(5050,() =>{
    console.log("Server started!")


})


