const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema ({
    name : {
        type : String,
        require: true,
    },
    description : {
        type : String,
        require: true,
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    product_id : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
        }
    ],
    address : {
        type: String,
        require: true,
    },
    rate : {
        type : Number,
    }

});

// export
module.exports = mongoose.model("Shop", shopSchema);