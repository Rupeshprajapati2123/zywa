const mongoose = require('mongoose');

const DeliveredSchema = new mongoose.Schema({
  'ID ': String,
  'Card ID': String,
  'User contact': String,
  'Timestamp': String,
  'Comment': String
});
const PickedSchema = new mongoose.Schema({
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
});

const DeliveredModel = mongoose.model('Delivered_model', DeliveredSchema);
const Delivery_exceptions_Model = mongoose.model('Delivered_model', DeliveredSchema);
const PickedModel=mongoose.model('Picked_model',PickedSchema);
const ReturnedModel=mongoose.model('Returned_model',ReturnedSchema);
module.exports = {DeliveredModel,
                Delivery_exceptions_Model,
                PickedModel,
            ReturnedSchema};
