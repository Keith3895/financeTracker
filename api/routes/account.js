const express = require("express");
const router = express.Router();
const accountHandler = require('../controllers/accountController');
const middleware = require('../middleware/');



router.get('/', (req, res, next) => {
    res.status(200).send('this works');
});

/**
 * @swagger
 * /account/add/:
 *   put:
 *     tags:
 *       - Account.
 *     description: API to add a new Account.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Account Data
 *         description: The Account information.
 *         in: body
 *         required: true
 *         schema:
 *           description: All the parameters you can send to the search engine
 *           $ref: '#definitions/Account'
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Operation Success
 *       406:
 *         description:  Operation Failed due to validation error.
 *       500:
 *         description:  Operation Failed due to internal server error.
 */


router.put('/add', middleware.jwtCheck, accountHandler.addAccount);

/**
 * @swagger
 * /account/getAccount/:
 *   post:
 *     tags:
 *       - Account.
 *     description: API to add a new Account.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: body
 *         required: true
 *         type: string
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Operation Success
 *       500:
 *         description:  Operation Failed due to internal server error.
 */
router.post('/getAccount', middleware.jwtCheck, accountHandler.getAccounts);



module.exports = router;


/**
 * @swagger
 * definitions:
 *  Account:
 *    type: object
 *    required:
 *      - accountNumber
 *      - balance
 *      - user
 *      - bankName
 *    properties:
 *      accountNumber:
 *        type: string
 *      balance:
 *        type: integer
 *      user:
 *        type: string
 *      bankName:
 *        type: string 
 */