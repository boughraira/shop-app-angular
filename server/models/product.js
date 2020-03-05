const mongoose = require('mongoose');


const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  image: {data:Buffer,contentType:String},
  price: Number,
  description: String,
  rate: {type: Number, default:5},
  stock:{type:Boolean,default:true}
  
});

module.exports = mongoose.model('Product', ProductSchema);
