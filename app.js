//Loading of all the required dependencies
const express = require('express');   
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;
const { connect } = require('./db');
const routes = require('./route'); 

// using middleware
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting to MONGODB cloud database
connect();

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
