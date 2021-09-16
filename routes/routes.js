const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const sauceCtrl = require ('../controllers/controller');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const Thing = require('../models/sauces');

// Middleware

//GET
router.get('/', sauceCtrl.getSauces);  
router.get('/:id', sauceCtrl.getSauce);
router.get('/', userCtrl.getUsers);  
  
//POST
router.post('/', sauceCtrl.postSauce);
router.post('/:id/like', sauceCtrl.likeSauce);
router.post('/', auth, multer, sauceCtrl.createThing);

//PUT
router.put('/:id', sauceCtrl.putSauce);
//router.post('/', auth, multer, stuffCtrl.createThing);
  
//DELETE
router.delete('/:id', sauceCtrl.deleteSauce);
 
//API Message
router.use('/', sauceCtrl.apiMsg);

module.exports = router;