//MONGODB PASSWORD: RVDhaf34IMTnrHQ9
//MONGODB CONNECTION: mongodb+srv://Antonio:<password>@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/routes');
const userRoutes =  require('./routes/user');

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
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

app.listen(8080, () => {
    console.log("Server Listening")
  })


//Data Management
// function getSauces(){
//     return {id:200}
// }

// function  getSauceFromId(id){
//     return sauces.find(sauce => sauce.id === id)
// }

//function postSauce (sauce){
//    return sauces.push(sauce)
//}

//function putSauce() {

//}
//module.exports = server;