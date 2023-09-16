const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const ProductSchema = moongose.Schema(
    {
        id:{
            type: Number
        },
        nombre:{
            type: String,
            required: [true, "Please enter a name"]
        },
        precio:{
            type: String,
            required: [true, "Please enter a price"]
        },
        categoria:{
            type: String,
            required: [true, "Please enter a category"]
        },
        imagenP:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

const MyProduct = mongoose.model("Product", ProductSchema);

module.exports = MyProduct;  