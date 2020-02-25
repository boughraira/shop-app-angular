const mongoose = require('mongoose');


const { Schema } = mongoose;

const RateSchema = new Schema({
  rate: {  type: Number, default:0 },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
  
  
});

module.exports = mongoose.model('Rating', RateSchema);