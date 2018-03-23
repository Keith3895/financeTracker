require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./api/models/user');
const Transaction = require('./api/models/transaction');
const Account = require('./api/models/account');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const cors 			= require('cors');
const morgan = require('morgan');



// Routes and middleware import
const middleware = require('./api/middleware');
const authRoutes = require('./api/routes/auth');
const transactionRoutes = require('./api/routes/transaction');
const accountRoutes = require('./api/routes/account');
  // Create Mongo Connection
  mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongodb);
//====================================
// configure Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ==============================
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('tiny'));
app.use(middleware.jwtCheck);
app.use('/auth',authRoutes);
app.use('/transaction',transactionRoutes);
app.use('/account',accountRoutes);
app.get('/', (req, res) => {
  res.redirect('/angular/');
});
app.get('/docs', (req, res) => {
  res.redirect('/api-docs/');
});
// Start Server
app.listen(process.env.PORT, () => {
  console.log('Server started on port '+process.env.PORT);
});