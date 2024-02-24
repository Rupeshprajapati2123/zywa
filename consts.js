
const { DeliveredSchema, PickupSchema, ReturnedSchema } = require('./schemas');
const arr = [
    { model: 'Delivered_model', schema: DeliveredSchema, field: 'User contact', by: true },
    { model: 'Delivery_exceptions', schema: DeliveredSchema, field: 'User contact', by: true },
    { model: 'Picked_model', schema: PickupSchema, field: 'User Mobile', by: false },
    { model: 'Returned_model', schema: ReturnedSchema, field: 'User contact', by: false },
  ];
  
  const a = ["User's card is "
            ,"Oops! User's Card was not Delivered , Because.",
             "User's Card is picked & will be delivered soon.",
             "Card was returned to Zywa."];
  
module.exports={arr,a};  