import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_id:{type: String, unique: true}, // String is shorthand for {type: String}
  status: {type:String, enum: ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELED'], default:"CREATED"},
  product:{
    name:{type: String},
    price:{type:Number},
    product_id:{type: String}
  }  
});
const Order = mongoose.model('Order',orderSchema);
export default Order;