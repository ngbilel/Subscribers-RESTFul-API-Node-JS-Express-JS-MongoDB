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

//Setup Routes
const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter)

app.listen(3000, ()=> console.log('Server Start listen on port 3000'));
