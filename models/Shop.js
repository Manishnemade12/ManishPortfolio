

// // models/Shop.js
// import mongoose from 'mongoose';

// const { Schema, model, models } = mongoose;

// const productSchema = new Schema({
//     title: { type: String },
//     slug: { type: String, required: true },
//     images: [{ type: String }],
//     description: { type: String },
//     tags: [{ type: String }],
//     afilink: { type: String },
//     price: { type: String },
//     status: { type: String },
// }, {
//     timestamps: true,
// });

// // Use the singleton pattern to prevent overwriting the model
// const Product = models.Product || model('Product', productSchema);

// export default Product;


import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true }, // Added required field
    slug: { type: String, required: true, unique: true }, // Ensure slug is unique
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String },
    status: { type: String, required: true }, // Ensure status is required
}, {
    timestamps: true,
});

// Use the singleton pattern to prevent overwriting the model
const Product = models.Product || model('Product', productSchema);

export default Product;
