// product.model.js is same as product.js nai, we just added .model to show model ho
// TEslai ignore garda hunxa. We can even keep the name product.js and nothing will change

import mongoose from "mongoose";

// Creating a db schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
},
{
    timestamp: true //createdAt, updatedAt
});

// Here, Product inside the model fuction MUST have a capital P
// This creates a scheme, that must follow the rules of 'productSchema'
const Product = mongoose.model('Product', productSchema);


export default Product;