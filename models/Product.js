// import mongoose
const mongoose = require('mongoose');
// import schema
const Schema = mongoose.Schema;

// defining Schema



let productSchema = new Schema({
    productId: {
        type: String,
        unique: true
    },
    productName: {
        type: String,
        default: ''
    },
    productDetails: {
        type: String,
        default: ''
    },
    productImage: {
        thumbnail: {
            type: String,
            default: 'https://via.placeholder.com/200x200'
        },
        large: {
            type: String,
            default: "https://via.placeholder.com/600x600"
        }
    },
    productPrice: {
        type: Number,
        default: 0
    },
    productPriceDiscount: {
        type: Number,
        default: 0
    },
    productViews: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: ''
    },
    seller: {
        type: String,
        default: ''
    },
    areaAvailability: [String],
    seoTags: [String],
    posted: {
        type: String,
        default: Date.now().toString()
    },
    lastUpdated: {
        type: String,
        default: Date.now().toString()
    },
    inCartOfCustomers: [String]

});

mongoose.model('Product', productSchema);