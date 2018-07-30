const express = require("express");
const router = express.Router();
const userHandlers = require('../controllers/userController.js');

router.get('/', (req, res, next) => {
    res.status(200).send('this works');
});

router.post('/register', userHandlers.register);
/**
 * @swagger
 * /sign_in:
 *   post:
 *     tags:
 *       - Authentication.
 *     description: API to Login to the application.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: remember
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Operation Success
 *       406:
 *         description: Authentication failed. Invalid user or password.
 *       401:
 *         description: Unauthorized user!
 *       500:
 *         description: Operation Failed
 */
router.post('/sign_in', userHandlers.sign_in);



module.exports = router;