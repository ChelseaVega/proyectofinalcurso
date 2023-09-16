const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const ImageSchema = moongose.Schema(
    {
        id:{
            type: Number
        },
        url:{
            type: String,
            required: [true, "Please enter an url"]
        }
    },
    {
        timestamps: true
    }
);

const MyIMG = mongoose.model("Image", ImageSchema);

module.exports = MyIMG;  