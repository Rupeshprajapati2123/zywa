const mongoose = require('mongoose');

// Delivered Schema
const DeliveredSchema = new mongoose.Schema({
  'ID': String,
  'Card ID': String,
  'User contact': String,
  'Timestamp': String,
  'Comment': String
});

// Pickup Schema
const PickupSchema = new mongoose.Schema({
  'ID': String,
  'Card ID': String,
  'User Mobile': String,
  'Timestamp': String,
});

// Returned Schema
const ReturnedSchema = new mongoose.Schema({
  'ID': String,
  'Card ID': String,
  'User contact': String,
  'Timestamp': String,
});

// Exporting schemas as modules
module.exports = {
  DeliveredSchema,
  PickupSchema,
  ReturnedSchema
};