const express = require('express');
const userControllers = require('./controllers/userControllers');
const accountControllers = require('./controllers/accountControllers');
const transactionControllers = require('./controllers/transactionControllers');
const router = express.Router();

router.get('/', (req, res) => {
   return res.json({
      message: "Hello world."
   })
})

// Users
router.post('/users', userControllers.registerUser);
router.get('/users', userControllers.getAllUser);
router.get('/users/:id', userControllers.getUserById);

// Accounts
router.post('/accounts', accountControllers.createAccount);
router.get('/accounts', accountControllers.getAllAccount);
router.get('/accounts/:id', accountControllers.getAccountById);

// Transactions
router.post('/transactions', transactionControllers.createTransaction);
router.get('/transactions', transactionControllers.getAllTransaction);
router.get('/transactions/:id', transactionControllers.getTransactionById);

module.exports = router;