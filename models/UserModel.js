const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const UserSchema = moongose.Schema(
    {
        id:{
            type: Number
        },
        nombre:{
            type: String,
            required: [true, "Please enter a name"]
        },
        apellido:{
            type: String,
            required: [true, "Please enter a lastname"]
        },
        cedula:{
            type: String,
            required: [true, "Please enter a ci"]
        },
        correo:{
            type: String,
            required: [true, "Please enter a email"]
        },
        usuario:{
            type: String,
            required: [true, "Please enter a valid user"]
        },
        password:{
            type: String,
            required: [true, "Please enter a password"]
        },
        verified:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const MyUser = mongoose.model("User", UserSchema);

module.exports = MyUser;  