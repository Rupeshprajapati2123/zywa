//Loading of all the required dependencies
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;

//Using middleware
const mongoURI = 'mongodb+srv://rupeshp2123:uchiha%40madara@cluster0.abmxpa0.mongodb.net/?retryWrites=true&w=majority';
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting to MONGODB cloud database
async function connect() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}
connect();

//Function to upload csv data to the cloud
async function uploadCsvData(schema, csvFilePath, collectionName) {
  const Model = mongoose.model(collectionName, schema);
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Model.insertMany(results);
        console.log(`CSV data uploaded to MongoDB for collection: ${collectionName}`);
      } catch (err) {
        console.error(err);
      }
    });
}
//Database schemas for data uploading
const DeliveredSchema = new mongoose.Schema({
  'ID': String,
  'Card ID': String,
  'User contact': String,
  'Timestamp': String,
  'Comment': String
});
const PickupSchema = new mongoose.Schema({
  'ID': String,
  'Card ID': String,
  'User Mobile': String,
  'Timestamp': String,
});
const ReturnedSchema = new mongoose.Schema({
  'ID': String,
  'Card ID': String,
  'User contact': String,
  'Timestamp': String,
})

//the function above is used here to upload all our CSVs to the cloud
app.get('/upload', (req, res) => {
  uploadCsvData(DeliveredSchema, __dirname + '/public/Delivered.csv', 'Delivered_model');
  uploadCsvData(DeliveredSchema, __dirname + '/public/Delivery_exceptions.csv', 'Delivery_exceptions')
  uploadCsvData(PickupSchema, __dirname + '/public/Pickup.csv', 'Picked_model')
  uploadCsvData(ReturnedSchema, __dirname + '/public/Returned.csv', 'Returned_model');
  res.send("CSVs Uploaded!")
})

//get request for taking the user Input.
app.get('/get_card_status', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});
/*
the function finds the value in mongo cloud tables the key is of two types some of the places the number was already in 
double quotations so in the database it stored like ""323455"" so we have to search the key like this in the cloud as I 
didn't want to edit the schemas. In the finding process as instructed we can remove 971 or 0 from the front of the number 
but as in database it's included so I didn't edit the CSVs.
*/
const findUserByName = async (userId, usermodel, modelschema, by, add) => {
  try {
    const uModel = mongoose.model(usermodel, modelschema);
    let key;
    if (add) {
      key = `"${userId}"`
    } else {
      key = userId;
    }
    const user = await uModel.findOne({ [by]: key });
    return user
  } catch (error) {
    return new Error("unable to find")
  }
};
const arr = [
  { model: 'Delivered_model', schema: DeliveredSchema, field: 'User contact', by: true },
  { model: 'Delivery_exceptions', schema: DeliveredSchema, field: 'User contact', by: true },
  { model: 'Picked_model', schema: PickupSchema, field: 'User Mobile', by: false },
  { model: 'Returned_model', schema: ReturnedSchema, field: 'User contact', by: false },
];

const a = ["Yay! Your Card is "
          ,"Oops! Your Card was not Delivered , Because.",
           "Yay! Your Card is picked & will be delivered soon.",
           "Your card is returned to us."]


/*
In the post request we are looking for the one CSV in which our user's mobile numeber lies ie. the status of the card
we can do it manually also but it would make code redundant so I used loop here and also passed the message to user.
*/
app.post('/get_card_status', async (req, res) => {
  const mobile = req.body.mobile;
  for (var i = 0; i < arr.length; i++) {
    const result = await findUserByName(mobile, arr[i].model, arr[i].schema, arr[i].field, arr[i].by);
    if (result) {
      res.render('userDetails', { user: result, status: a[i] });
      return;
    }
  }
  res.sendFile(__dirname + '/public/not_found.html');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
