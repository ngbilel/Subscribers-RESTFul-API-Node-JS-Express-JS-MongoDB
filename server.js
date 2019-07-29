require ('dotenv').config()
const express = require ('express');
const app= express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });

const db= mongoose.connection;

db.on('error',(error)=> console.log(error));
db.once('open',()=> console.log('Connected to Database'));

//Setup server to accept JSON
app.use(express.json());


app.listen(3000, ()=> console.log('Server Start listen on port 3000'));
