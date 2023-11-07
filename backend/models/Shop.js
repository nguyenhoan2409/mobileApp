const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
