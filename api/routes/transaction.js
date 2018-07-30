const express = require("express");
const router = express.Router();
const transactionHandlers = require('../controllers/transactionController');
const middleware = require('../middleware/');
router.get('/', (req, res, next) => {
    res.status(200).send('this works');
});



/**
 * @swagger
 * /transaction/add/:
 *   put:
 *     tags:
 *       - Transaction.
 *     description: API to add a new Account.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: account
 *         description: Account Number ending.
 *         in: body
 *         required: true
 *         type: string
 *       - name: transaction
 *         description: Transaction amount.
 *         in: body
 *         required: true
 *         type: number
 *       - name: balance
 *         description: the balance for the account.
 *         in: body
 *         required: true
 *         type: number
 *       - name: type
 *         description: the type of transaction, credit or debit.
 *         in: body
 *         required: true
 *         type: string
 *       - name: date
 *         description: the balance for the account.
 *         in: body
 *         required: true
 *         type: date
 *       - name: geoLocation
 *         description: The geolocation linked to the transaction.
 *         in: body
 *         required: true
 *         type: object
 *       - name: user
 *         description: Username of the related account.
 *         in: body
 *         required: true
 *         type: string
 *       - name: category
 *         description: pending Dev.
 *         in: body
 *         required: true
 *         type: string
 *       - name: Comment
 *         description: pending Dev.
 *         in: body
 *         required: true
 *         type: string
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Operation Success
 *       409:
 *         description:  error in adding data.
 *       500:
 *         description:  Operation Failed due to internal server error.
 */


router.put('/add', middleware.jwtCheck, transactionHandlers.addTransaction);
router.put('/addMany', middleware.jwtCheck, transactionHandlers.addMultiTransactions);
router.post('/get', middleware.jwtCheck, transactionHandlers.getTransactions);



module.exports = router;