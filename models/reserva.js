const mongoose = require('mongoose');
const reservaRouter = require('../controllers/reservas');

const reservaSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: String,
  direccion: String,
  mesa: String,
  hora: String,
  fecha: String
});

// Configurar la respuesta de la reserva en el schema
reservaSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
  }
});

//Seleccionamos un nombre, registrar el modelo , tablas del modelo
const Reserva = mongoose.model('Reserva', reservaSchema);

//se exporta
module.exports = Reserva;
