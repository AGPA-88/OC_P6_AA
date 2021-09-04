//MONGODB PASSWORD: RVDhaf34IMTnrHQ9
//MONGODB CONNECTION: mongodb+srv://Antonio:<password>@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const sauces = getSauces();

mongoose.connect('mongodb+srv://Antonio:RVDhaf34IMTnrHQ9@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then (() => {
        console.log('Sucessfully connected to MongoDB!')
    })
    .catch(() => {
        console.log('Unable to connect to MongoDB!')
        console.error(error);
    });

// Middleware
app.use(express.json())

app.get('/sauces', (req,res) => {
    res.send(sauces)
})

app.get('/sauces/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const sauce = getSauceFromId (id)
    res.status(200).json(sauce)
})

app.post('/sauces', (req,res) => {
    postSauce(req.body)
    res.status(200).json(sauces)
})

app.put('/sauces/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let sauce = getSauceFromId (id)
    sauce.name =req.body.name,
    sauce.manufacturer =req.body.manufacturer,
    sauce.mainPepper =req.body.mainPepper,
    sauce.heat =req.body.heat,
    sauce.imageUrl =req.body.imageUrl,
    res.status(200).json(sauce)
})

app.delete('/sauces/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let sauce = sauces.find(sauce => sauce.id === id)
    sauces.splice(sauces.indexOf(sauce),1)
    res.status(200).json(sauces)
})

app.listen(8080, () => {
    console.log("Server Listening")
  })


//Data Management
function getSauces(){
    return require('./models/sauces.js')
}

function  getSauceFromId(id){
    return sauces.find(sauce => sauce.id === id)
}

function postSauce (sauce){
    return sauces.push(sauce)
}

function putSauce() {

}