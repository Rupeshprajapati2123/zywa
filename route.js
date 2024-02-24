const express = require('express');
const router = express.Router();
const { uploadCsvData, findUserByName } = require('./functions');
const { DeliveredSchema, PickupSchema, ReturnedSchema } = require('./schemas');
const { a, arr } = require('./consts');

// Route for uploading CSVs
router.get('/upload', (req, res) => {
  uploadCsvData(DeliveredSchema, __dirname + '/public/Delivered.csv', 'Delivered_model');
  uploadCsvData(DeliveredSchema, __dirname + '/public/Delivery_exceptions.csv', 'Delivery_exceptions');
  uploadCsvData(PickupSchema, __dirname + '/public/Pickup.csv', 'Picked_model');
  uploadCsvData(ReturnedSchema, __dirname + '/public/Returned.csv', 'Returned_model');
  res.send("CSVs Uploaded!");
});

// Route for getting card status
router.get('/get_card_status', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route for handling post request to get card status
router.post('/get_card_status', async (req, res) => {
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

module.exports = router;

