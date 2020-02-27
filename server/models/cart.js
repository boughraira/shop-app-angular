const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
products:[{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Cart', CartSchema);