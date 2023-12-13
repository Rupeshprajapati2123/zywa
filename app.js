const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
const path = require('path');
const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://rupeshp2123:uchiha%40madara@cluster0.abmxpa0.mongodb.net/?retryWrites=true&w=majority';
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
async function connect() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}
connect();

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
const DeliveredSchema = new mongoose.Schema({
  'ID ': String,
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
  'ID ': String,
  'Card ID': String,
  'User contact': String,
  'Timestamp': String,
})

app.get('/upload',(req,res)=>{
  uploadCsvData(DeliveredSchema, __dirname+'/public/Delivered.csv', 'Delivered_model');
  uploadCsvData(DeliveredSchema,__dirname+'/public/Delivery_exceptions.csv','Delivery_exceptions')
  uploadCsvData(PickupSchema,__dirname+'/public/Pickup.csv','Picked_model')
  uploadCsvData(ReturnedSchema,__dirname+'/public/Returned.csv','Returned_model');
})
app.get('/find',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html')
});

const findUserByName = async (userId,usermodel,modelschema,by,add) => {
  try {
    const uModel=mongoose.model(usermodel,modelschema);
    let key;
    if(add)
    {
      key=`"${userId}"`
    }else{
      key=userId;
    }
    const user = await uModel.findOne({[by]:key});
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
app.post('/find', async (req, res) => {
  const mobile = req.body.mobile;
  for (const c of arr) {
    const result = await findUserByName(mobile, c.model, c.schema, c.field, c.by);
    if (result) {
      res.send(result);
      return;
    }
  }
  res.send(`No Data`);
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
