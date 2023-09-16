require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/UserModel");
const Reservation = require("./models/ReservationModel");
const Product = require("./models/ProductModel");
const Image = require("./models/ImageModel");
const usersRouter = require("./controllers/users");
const reservasRouter = require("./controllers/reservas");
const app = express();
const path = require("path");
const PORT = 5000;
const port = process.env.PORT || PORT;

const bodyParser = require("body-parser");
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/reservas", reservasRouter);

// routes

app.use("/home", express.static(path.resolve("views", "home")));
app.use("/components", express.static(path.resolve("views", "components")));
app.use(
  "/iniciarsesion",
  express.static(path.resolve("views", "iniciarsesion"))
);
app.use("/registro", express.static(path.resolve("views", "registro")));
app.use("/usuarios", express.static(path.resolve("views", "usuarios")));
app.use("/delivery", express.static(path.resolve("views", "delivery")));
app.use("/adm", express.static(path.resolve("views", "adm")));
app.use("/reserva", express.static(path.resolve("views", "reserva")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());

app.post("/newuser", async (req, res) => {
  const { correo, password } = req.body;
  const errorMessage = "El correo y clave ya existen en la base de datos.";

  try {
    // check user exist
    const user = await User.findOne({
      correo: correo,
    });

    if (user) {
      res.status(404).json({ message: "usuario ya existe!" });
    } else {
      const newUser = await User.create(req.body);
      res.status(201).json({ message: "usuario creado!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/newreservation", async (req, res) => {
  try {
    const userReservation = await Reservation.create(req.body);
    res.status(200).json(userReservation);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const correo = req.body.correo;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      correo: correo,
      password: password,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/getproduct/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//conexion a la bd
const opciones = {
  user: "chelseavegasanchez",
  pass: "1004chelsea",
  useNewUrlParser: true,
  useUnifiedTopology: true
};

(async () => {
  try {
    await mongoose.connect('mongodb+srv://chelseavegasanchez:1004chelsea@cluster0.qci5ldh.mongodb.net/?retryWrites=true', opciones);
    console.log("Te has conectado a MongoDB");
  } catch (error) {
    console.log("Error");
  }
})();

function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = generateRandomId(6) + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  // Access other form data like req.body.fieldName
  const { nombre, precio, categoria } = req.body;

  // Get the uploaded image filename
  const imageFilename = req.file.filename;

  // edit product
  try {
    await Product.create({
      nombre,
      precio,
      categoria,
      imagenP: imageFilename,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }

  res.redirect("/adm/");
  // res.send(`Form data received. Image uploaded with filename: ${imageFilename}`);
});

app.post("/upload2/:id", upload.single("image"), async (req, res) => {
  // Access other form data like req.body.fieldName
  const { nombre, precio, categoria } = req.body;

  const productIdToUpdate = req.params.id; // Replace with the actual product ID
  const updatedData = {
    nombre,
    precio,
    categoria,
  };

  Product.findOneAndUpdate(
    { _id: productIdToUpdate },
    updatedData,
    { new: true } // This option returns the updated document
  )
    .then((updatedProduct) => {
      if (updatedProduct) {
        console.log("Updated product:", updatedProduct);
        res.redirect("/adm/");
      } else {
        console.log("Product not found");
        res.status(404).json({ message: "bad 1" });
      }
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "bad" });
    });
});

app.post("/deleteproduct/:id", async (req, res) => {
  const productIdToDelete = req.params.id; // Replace with the actual product ID

  Product.findOneAndDelete({ _id: productIdToDelete })
    .then((deletedProduct) => {
      if (deletedProduct) {
        console.log("Deleted product:", deletedProduct);
        res.redirect("/adm/");
      } else {
        console.log("Product not found");
        res.status(404).json({ message: "bad" });
      }
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: "bad" });
    });
});
