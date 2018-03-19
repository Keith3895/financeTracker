const express = require("express");
const router = express.Router();
const transactionHandlers = require('../controllers/transactionController');
const middleware = require('../middleware/');
router.get('/', (req, res, next) => {
    res.status(200).send('this works');
});
router.put('/add', middleware.jwtCheck, transactionHandlers.addTransaction);

router.post('/get', middleware.jwtCheck, transactionHandlers.getTransactions);



module.exports = router;