const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://rupeshp2123:uchiha%40madara@cluster0.abmxpa0.mongodb.net/?retryWrites=true&w=majority';
async function connect() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}
module.exports = { connect }; 