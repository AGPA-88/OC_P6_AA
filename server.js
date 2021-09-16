//MONGODB PASSWORD: RVDhaf34IMTnrHQ9
//MONGODB CONNECTION: mongodb+srv://Antonio:<password>@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/routes');
const userRoutes =  require('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

mongoose.connect('mongodb+srv://Antonio:RVDhaf34IMTnrHQ9@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then (() => {
        console.log('Sucessfully connected to MongoDB!')
    })
    .catch(() => {
        console.log('Unable to connect to MongoDB!')
        console.error(error);
    });
    
app.use(express.json());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

app.listen(3000, () => {
    console.log("Server Listening")
  })