const express = require('express');
const router = express.Router();

const Thing = require('../models/sauces');

// Middleware

//GET

router.get('/', (req, res, next) => {
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
  
  router.get('/:id', (req, res, next) => {
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
  
//POST

  router.post('/', (req, res, next) => {
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
  
//PUT

  router.put('/:id', (req,res) => {
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
  
  router.delete('/:id', (req, res, next) => {
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
 
//API Message
  
  router.use('/', (req,res) => {
    res.status(200).json({
      message: "This API only authorizes GET, POST, PUT and DELETE"
    });
  });

module.exports = router;