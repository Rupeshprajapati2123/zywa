const mongoose = require('mongoose');

async function connect() {
    try {
        
        await mongoose.connect('mongodb+srv://rupeshp2123:uchiha%40madara@cluster0.abmxpa0.mongodb.net/?retryWrites=true&w=majority')
          console.log('Connected');
        } catch (err) {
          console.log(err);
        }
      }
    
module.exports = connect;
