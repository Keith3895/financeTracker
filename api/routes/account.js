const express = require("express");
const router = express.Router();
const accountHandler = require('../controllers/accountController');
const middleware = require('../middleware/');
router.get('/', (req, res, next) => {
    res.status(200).send('this works');
});
router.put('/add', middleware.jwtCheck, accountHandler.addAccount);

router.post('/get', middleware.jwtCheck, accountHandler.getAccounts);



module.exports = router;