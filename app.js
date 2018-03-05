const express	 	= require('express');
const app 			= express();
const path 			= require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });
  // Start Server
  app.listen(8080, () => {
    console.log('Server started on port ');
  });