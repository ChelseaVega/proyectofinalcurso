const mongoose = require('mongoose');
const opciones = {
  user: "chelseavegasanchez",
  pass: "1004chelsea",
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect('mongodb+srv://admin:12345678Admin@alejandroapi.grz5nle.mongodb.net/Node-API?retryWrites=true&w=majority', opciones);
module.exports = mongoose;