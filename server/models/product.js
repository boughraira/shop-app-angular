const mongoose = require('mongoose');


const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  rate: {type: Number, default:5},
  stock:{type:Boolean,default:true},
  quantity:{type:Number,default:1}
  
});

module.exports = mongoose.model('Product', ProductSchema);
