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
const cors = require('cors');
const morgan = require('morgan');
const fs = require("fs")
const swaggerJSDoc = require('swagger-jsdoc');

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()


var options = {
  swaggerDefinition: {
    info: {
      "title": "Finance Tracker API Docs",
      "description": "Finance Tracker API Documentation for nodeJS services.",
      // "termsOfService": "http://example.com/terms/",
      "contact": {
        "name": "Keith Franklin",
        "url": "http://www.keithfranklin.xyz",
        "email": "keith30895@gmail.com"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
      },
      "version": "1.0.1",
    },
    basePath: "/",
    securityDefinitions: {
      "basicAuth": {
        "type": "basic",
        "description": "HTTP Basic Authentication. Works over HTTP"
      }
    }
  },
  apis: ['./api/**/*.js'], // Path to the API docs
};



// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);
const indexContent = fs.readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString()
  .replace("https://petstore.swagger.io/v2/swagger.json", `http://localhost:${process.env.PORT}/api-docs.json`);
fs.writeFile(`${pathToSwaggerUi}/index.html`, indexContent, 'utf8', (err) => {
  console.log("err", err);
});
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
app.use('/docs', express.static(pathToSwaggerUi));
// app.get("/docs/", (req, res) => res.send(indexContent));
// app.get("/docs/index.html", (req, res) => res.send(indexContent));
// app.use(middleware.jwtCheck);
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);
app.use('/account', accountRoutes);
app.get('/', (req, res) => {
  res.redirect('/angular/');
});
app.get('/api-docs.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// Start Server
app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});