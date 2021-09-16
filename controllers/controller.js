const Thing = require ('../models/sauces');

//GET
exports.getSauces = (req, res, next) => {
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
  };

exports.getSauce = (req, res, next) => {
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
  };

//POST
  exports.postSauce = (req, res, next) => {
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
  };


  exports.likeSauce = (req, res, next) => {
    Thing.findOne({_id: req.params.id}).then((sauce) => {
          if (req.body.like == 1 && sauce.usersLiked.includes(req.body.userId) === false) {
              sauce.usersLiked.push(req.body.userId)
              if (sauce.likes){
                sauce.likes += 1}
              else {
                sauce.likes = 1
              }
              console.log('Added user in userLiked')
          } else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
              sauce.usersLiked.remove(req.body.userId)
              sauce.likes -= 1
          } else if (req.body.like == -1 && sauce.usersDisliked.includes(req.body.userId) === false) {
              sauce.usersDisliked.push(req.body.userId)
              if (sauce.dislikes){
                sauce.dislikes += 1}
              else {
                sauce.dislikes = 1
              }
          } else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
              sauce.usersDisliked.remove(req.body.userId)
              sauce.dislikes -= 1
          }         
          sauce.save().then(
              () => {
                  res.status(201).json({
                      message: "Sauce Like Updated!"
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
    };


//PUT  
  exports.putSauce = (req,res) => {
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
  };

//DELETE 
  exports.deleteSauce = (req, res, next) => {
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
  };

  exports.apiMsg = (req,res) => {
    res.status(200).json({
      message: "This API only authorizes GET, POST, PUT and DELETE"
    });
  };


//MUTLER

exports.createThing = (req, res, next) => {
  req.body.thing = JSON.parse(req.body.thing);
  const url = req.protocol + '://' + req.get('host');
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  });
  thing.save().then(
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
};