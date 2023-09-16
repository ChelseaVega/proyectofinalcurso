const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const ReservationSchema = moongose.Schema(
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
        direccion:{
            type: String,
            required: [true, "Please enter a email"]
        },
        mesa:{
            type: String,
            required: [true, "Please enter a table"]
        },
        hora:{
            type: String,
            required: [true, "Please enter a hour"]
        },
        fecha:{
            type: String,
            required: [true, "Please enter a date"]
        }
    },
    {
        timestamps: true
    }
);

const MyReservation = mongoose.model("Reservation", ReservationSchema);

module.exports = MyReservation;  