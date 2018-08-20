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
 *       - name: Transaction
 *         description: Transaction details.
 *         in: body
 *         required: true
 *         schema:
 *           description: All the parameters you can send to the search engine
 *           $ref: '#/definitions/transaction'
 *            
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



/**
 * @swagger
 * /transaction/addMany/:
 *   put:
 *     tags:
 *       - Transaction.
 *     description: API to add a new Account. Note that this api accepts a array.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Transactions
 *         description: Transactions array.
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/transaction'
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


router.put('/addMany', middleware.jwtCheck, transactionHandlers.addMultiTransactions);



/**
 * @swagger
 * /transaction/get/:
 *   post:
 *     tags:
 *       - Transaction.
 *     description: API to add a new Account.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: filter
 *         description: Account Number ending.
 *         in: body
 *         required: true
 *         schema:
 *           transaction:
 *             type: object
 *             properties:
 *               id:
 *                 type:integer
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Operation Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/transaction'
 *       409:
 *         description:  error in adding data.
 *       500:
 *         description:  Operation Failed due to internal server error.
 */

router.post('/getTransactions', middleware.jwtCheck, transactionHandlers.getTransactions);



module.exports = router;




/**
 * @swagger
 * definitions:
 *  transaction:
 *    type: object
 *    required:
 *      - account
 *      - transaction
 *      - balance
 *      - type
 *      - date
 *      - user
 *    properties:
 *      account:
 *        type: string
 *      transaction:
 *        type: number
 *      balance:
 *        type: number
 *      type:
 *         type: string
 *      date:
 *         type: date
 *      geoLocation:
 *         type: object
 *      user:
 *         type: string
 *      category:
 *         type: string
 */