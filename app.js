require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./api/models/user');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const cors 			= require('cors');


// Routes and middleware import
const middleware = require('./api/middleware');
const authRoutes = require('./api/routes/auth');

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

app.use('/auth',authRoutes);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});
// Start Server
app.listen(process.env.PORT, () => {
  console.log('Server started on port '+process.env.PORT);
});