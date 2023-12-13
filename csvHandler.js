const fs = require('fs');
const csv = require('csv-parser');
const DeliveredModel = require('./schema');
const PickedModel=require('./')
const uploadCsvData = async (csvFilePath) => {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await DeliveredModel.insertMany(results);
        console.log('CSV data uploaded to MongoDB');
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
      }
    });
};

const findUserById = async (userId) => {
  try {
    const user = await DeliveredModel.findOne({'ID ':userId});

    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error searching for user:', error);
  } finally {
    // You may want to close the connection here or handle it in a different way
  }
};

module.exports = {
  uploadCsvData,
  findUserById,
};
