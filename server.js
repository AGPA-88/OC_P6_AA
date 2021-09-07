//MONGODB PASSWORD: RVDhaf34IMTnrHQ9
//MONGODB CONNECTION: mongodb+srv://Antonio:<password>@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Antonio:RVDhaf34IMTnrHQ9@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then (() => {
        console.log('Sucessfully connected to MongoDB!')
    })
    .catch(() => {
        console.log('Unable to connect to MongoDB!')
        console.error(error);
    });
    

const Thing =  require('./models/sauces');

// const sauces = getSauces();

// Middleware
app.use(express.json());



app.get('/sauces', (req, res, next) => {
  Thing.find().then(
      (sauces) => {
      res.status(200).json(sauces);
      }
  ).catch(
      (error) => {
      res.status(400).json({
          error: error
      });
      }
  );
});

app.get('/sauces/:id', (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

// app.get('/sauces', (req,res) => {
//     res.send(sauces)
// })

// app.get('/sauces/:id', (req,res) => {
//     const id = parseInt(req.params.id)
//     const sauce = getSauceFromId (id)
//     res.status(200).json(sauce)
// })

//app.post('/sauces', (req,res) => {
//    postSauce(req.body)
//    res.status(200).json(sauces)
//})

app.post('/sauces', (req, res, next) => {
  const sauce = new Thing({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });

  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


app.put('/sauces/:id', (req,res) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      sauce.userId =req.body.userId,
      sauce.name =req.body.name,
      sauce.manufacturer =req.body.manufacturer,
      sauce.mainPepper =req.body.mainPepper,
      sauce.heat =req.body.heat,
      sauce.imageUrl =req.body.imageUrl

      sauce.save().then(
        () => {
          res.status(201).json({
            message: 'Updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      )
  })
});

//DELETE

// app.delete('/sauces/:id', (req,res) => {
//     const id = parseInt(req.params.id)
//     let sauce = sauces.find(sauce => sauce.id === id)
//     sauces.splice(sauces.indexOf(sauce),1)
//     res.status(200).json(sauces)
// })

app.delete('/sauces/:id', (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.use('/sauces', (req,res) => {
  res.status(200).json({
    message: "This API only authorizes GET, POST, PUT and DELETE"
  });
});

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