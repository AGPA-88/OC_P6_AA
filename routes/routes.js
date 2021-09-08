const express = require('express');
const router = express.Router();
const sauceCtrl = require ('../controllers/controller');

//const Thing = require('../models/sauces');

// Middleware

//GET
router.get('/', sauceCtrl.getSauces);  
router.get('/:id', sauceCtrl.getSauce);
  
//POST
router.post('/', sauceCtrl.postSauce);
  
//PUT
router.put('/:id', sauceCtrl.putSauce);
  
//DELETE
router.delete('/:id', sauceCtrl.deleteSauce);
 
//API Message
router.use('/', sauceCtrl.apiMsg);

module.exports = router;