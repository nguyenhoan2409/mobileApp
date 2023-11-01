const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    quantityInStock: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
