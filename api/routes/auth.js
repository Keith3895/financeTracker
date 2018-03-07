const express = require("express");
const router  = express.Router();
const userHandlers = require('../controllers/userController.js');

router.get('/',(req,res,next)=>{
    res.status(200).send('this works');
});

router.post('/register',userHandlers.register);

router.post('/sign_in',userHandlers.sign_in);


        
module.exports = router;