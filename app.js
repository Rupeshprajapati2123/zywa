const express = require('express');
const connectToDatabase = require('./database');
const { uploadCsvData, findUserById } = require('./csvHandler');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
connectToDatabase();
app.get('/',(req,res)=>{
  res.sendFile('C:/Users/Dragon Sin/Desktop/zywa/index.html')
})
app.post('/', (req, res) => {
  
  res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
});
app.get('/test',(req,res)=>{
  res.sendFile(__dirname+'/Delivered.csv')
})
app.get('/upload-csv', (req, res) => {
  const deliveredPath = __dirname+'/Delivered.csv';
  const delivery_expectations = __dirname+'/Delivery_exceptions.csv';
  const pickupPath = __dirname+'/Pickup.csv';
  const returnedPath = __dirname+'/Returned.csv';
  uploadCsvData(deliveredPath);
  uploadCsvData(deliveredPath);
  uploadCsvData();
  uploadCsvData(csvFilePath);
  res.send('Uploading CSV data...');
});

app.get('/find', (req, res) => {
  const userId = 'A883';
  findUserById(userId);
  res.sendFile('C:/Users/Dragon Sin/Desktop/zywa/index.html')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
