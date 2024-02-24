const mongoose=require('mongoose')
const fs = require('fs');
const csv = require('csv-parser');

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
  module.exports={uploadCsvData, findUserByName}