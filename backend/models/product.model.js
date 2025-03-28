import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    required:true
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 1
  },
  images: {
    type:Array,
    required:true
  },
  sizes:{
    type:Array,
    required:true
  },
  highlights:{
    type:Array,
  },
  status:{
    type:Boolean,
    default:true
  },
  ratings: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Auto-update status based on stock
productSchema.pre("save", function (next) {
  this.status = this.stock > 0 ? "In Stock" : "Out of Stock";
  next();
});

export default mongoose.model("Product", productSchema);
